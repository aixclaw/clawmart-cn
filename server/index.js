const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const db = require('./db');

// 初始化种子数据
require('./seed');

const app = express();
const PORT = 3180;
const JWT_SECRET = 'clawmart-cn-secret-2026';

app.use(cors());
app.use(express.json());

// ==================== 中间件 ====================
function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: '请先登录' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: '登录已过期，请重新登录' });
  }
}

// ==================== 用户API ====================

// 注册
app.post('/api/auth/register', async (req, res) => {
  const { email, password, nickname } = req.body;
  if (!email || !password) return res.status(400).json({ error: '请填写邮箱和密码' });

  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (exists) return res.status(400).json({ error: '该邮箱已注册' });

  const id = uuid();
  const hash = await bcrypt.hash(password, 10);
  db.prepare('INSERT INTO users (id, email, password, nickname) VALUES (?, ?, ?, ?)').run(id, email, hash, nickname || email.split('@')[0]);

  const token = jwt.sign({ id, email, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id, email, nickname: nickname || email.split('@')[0], role: 'user' } });
});

// 登录
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: '请填写邮箱和密码' });

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(400).json({ error: '账号不存在' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: '密码错误' });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, nickname: user.nickname, role: user.role, balance: user.balance } });
});

// 获取当前用户
app.get('/api/auth/me', auth, (req, res) => {
  const user = db.prepare('SELECT id, email, nickname, avatar, role, balance, created_at FROM users WHERE id = ?').get(req.user.id);
  if (!user) return res.status(404).json({ error: '用户不存在' });
  res.json(user);
});

// ==================== 商品API ====================

// 商品列表
app.get('/api/products', (req, res) => {
  const { category, tag, page = 1, limit = 20, search } = req.query;
  let sql = "SELECT p.*, u.nickname as creator_name FROM products p LEFT JOIN users u ON p.creator_id = u.id WHERE p.status = 'active'";
  const params = [];

  if (category) { sql += ' AND p.category = ?'; params.push(category); }
  if (tag) { sql += ' AND p.tag = ?'; params.push(tag); }
  if (search) { sql += ' AND (p.name LIKE ? OR p.description LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }

  sql += ' ORDER BY p.sales DESC, p.created_at DESC';

  const offset = (parseInt(page) - 1) * parseInt(limit);
  sql += ` LIMIT ? OFFSET ?`;
  params.push(parseInt(limit), offset);

  const products = db.prepare(sql).all(...params);

  // 总数
  let countSql = "SELECT COUNT(*) as total FROM products WHERE status = 'active'";
  const countParams = [];
  if (category) { countSql += ' AND category = ?'; countParams.push(category); }
  if (tag) { countSql += ' AND tag = ?'; countParams.push(tag); }
  if (search) { countSql += ' AND (name LIKE ? OR description LIKE ?)'; countParams.push(`%${search}%`, `%${search}%`); }

  const { total } = db.prepare(countSql).get(...countParams);

  res.json({ products: products.map(p => ({ ...p, features: JSON.parse(p.features || '[]'), price: p.price / 100 })), total, page: parseInt(page), limit: parseInt(limit) });
});

// 商品详情
app.get('/api/products/:id', (req, res) => {
  const product = db.prepare('SELECT p.*, u.nickname as creator_name, u.avatar as creator_avatar FROM products p LEFT JOIN users u ON p.creator_id = u.id WHERE p.id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: '商品不存在' });
  res.json({ ...product, features: JSON.parse(product.features || '[]'), price: product.price / 100 });
});

// 创建商品（需要登录）
app.post('/api/products', auth, (req, res) => {
  const { name, description, long_description, price, category, tag, features } = req.body;
  if (!name || !description || !category) return res.status(400).json({ error: '请填写必要信息' });

  const id = uuid();
  db.prepare('INSERT INTO products (id, name, description, long_description, price, category, tag, features, creator_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(id, name, description, long_description || '', Math.round((price || 0) * 100), category, tag || '', JSON.stringify(features || []), req.user.id);

  // 升级为创作者
  db.prepare('UPDATE users SET role = "creator" WHERE id = ? AND role = "user"').run(req.user.id);

  res.json({ id, message: '创建成功' });
});

// ==================== 订单API ====================

// 创建订单
app.post('/api/orders', auth, (req, res) => {
  const { product_id, pay_method } = req.body;
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(product_id);
  if (!product) return res.status(404).json({ error: '商品不存在' });

  // 免费商品直接完成
  if (product.price === 0) {
    const id = uuid();
    db.prepare('INSERT INTO orders (id, user_id, product_id, amount, status, paid_at) VALUES (?, ?, ?, 0, "paid", datetime("now"))').run(id, req.user.id, product_id);
    db.prepare('UPDATE products SET downloads = downloads + 1, sales = sales + 1 WHERE id = ?').run(product_id);
    return res.json({ id, status: 'paid', message: '获取成功' });
  }

  const id = uuid();
  db.prepare('INSERT INTO orders (id, user_id, product_id, amount, pay_method) VALUES (?, ?, ?, ?, ?)')
    .run(id, req.user.id, product_id, product.price, pay_method || 'wechat');

  // 模拟支付链接
  res.json({ id, amount: product.price / 100, pay_url: `https://pay.clawmart.cn/order/${id}`, message: '请完成支付' });
});

// 支付回调（模拟）
app.post('/api/orders/:id/pay', (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: '订单不存在' });

  db.prepare('UPDATE orders SET status = "paid", paid_at = datetime("now") WHERE id = ?').run(order.id);
  db.prepare('UPDATE products SET sales = sales + 1, downloads = downloads + 1 WHERE id = ?').run(order.product_id);

  // 给创作者分成90%
  const product = db.prepare('SELECT creator_id FROM products WHERE id = ?').get(order.product_id);
  const creatorShare = Math.floor(order.amount * 0.9);
  db.prepare('UPDATE users SET balance = balance + ? WHERE id = ?').run(creatorShare, product.creator_id);

  res.json({ message: '支付成功' });
});

// 我的订单
app.get('/api/orders', auth, (req, res) => {
  const orders = db.prepare('SELECT o.*, p.name as product_name, p.category FROM orders o LEFT JOIN products p ON o.product_id = p.id WHERE o.user_id = ? ORDER BY o.created_at DESC').all(req.user.id);
  res.json(orders.map(o => ({ ...o, amount: o.amount / 100 })));
});

// ==================== 创作者API ====================

// 我的商品
app.get('/api/creator/products', auth, (req, res) => {
  const products = db.prepare('SELECT * FROM products WHERE creator_id = ? ORDER BY created_at DESC').all(req.user.id);
  res.json(products.map(p => ({ ...p, features: JSON.parse(p.features || '[]'), price: p.price / 100 })));
});

// 收入统计
app.get('/api/creator/stats', auth, (req, res) => {
  const totalSales = db.prepare('SELECT COALESCE(SUM(o.amount), 0) as total FROM orders o JOIN products p ON o.product_id = p.id WHERE p.creator_id = ? AND o.status = "paid"').get(req.user.id);
  const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders o JOIN products p ON o.product_id = p.id WHERE p.creator_id = ? AND o.status = "paid"').get(req.user.id);
  const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products WHERE creator_id = ?').get(req.user.id);
  const user = db.prepare('SELECT balance FROM users WHERE id = ?').get(req.user.id);

  res.json({
    total_revenue: Math.floor(totalSales.total * 0.9) / 100,
    total_orders: totalOrders.count,
    total_products: totalProducts.count,
    balance: (user?.balance || 0) / 100
  });
});

// 提现
app.post('/api/creator/withdraw', auth, (req, res) => {
  const { amount, method, account } = req.body;
  const user = db.prepare('SELECT balance FROM users WHERE id = ?').get(req.user.id);
  const amountCents = Math.round(amount * 100);

  if (amountCents > user.balance) return res.status(400).json({ error: '余额不足' });
  if (amountCents < 1000) return res.status(400).json({ error: '最低提现10元' });

  const id = uuid();
  db.prepare('INSERT INTO withdrawals (id, user_id, amount, method, account) VALUES (?, ?, ?, ?, ?)').run(id, req.user.id, amountCents, method, account);
  db.prepare('UPDATE users SET balance = balance - ? WHERE id = ?').run(amountCents, req.user.id);

  res.json({ id, message: '提现申请已提交，预计1-3个工作日到账' });
});

// ==================== 健康检查 ====================
app.get('/api/health', (req, res) => {
  const count = db.prepare('SELECT COUNT(*) as count FROM products').get();
  res.json({ status: 'ok', products: count.count, time: new Date().toISOString() });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 ClawMart API 运行在 http://localhost:${PORT}`);
  console.log(`📖 健康检查: http://localhost:${PORT}/api/health`);
});
