const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'clawmart.db'));

// 启用WAL模式，提升并发性能
db.pragma('journal_mode = WAL');

// 创建表
db.exec(`
  -- 用户表
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    phone TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    nickname TEXT DEFAULT '',
    avatar TEXT DEFAULT '',
    role TEXT DEFAULT 'user',  -- user / creator / admin
    balance INTEGER DEFAULT 0,  -- 余额（分）
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- 商品表
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT DEFAULT '',
    price INTEGER DEFAULT 0,  -- 价格（分）
    category TEXT NOT NULL,  -- persona / skill
    tag TEXT DEFAULT '',
    features TEXT DEFAULT '[]',  -- JSON数组
    creator_id TEXT NOT NULL,
    status TEXT DEFAULT 'active',  -- active / draft / disabled
    downloads INTEGER DEFAULT 0,
    sales INTEGER DEFAULT 0,
    file_url TEXT DEFAULT '',
    cover_url TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (creator_id) REFERENCES users(id)
  );

  -- 订单表
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    amount INTEGER NOT NULL,  -- 金额（分）
    status TEXT DEFAULT 'pending',  -- pending / paid / refunded
    pay_method TEXT DEFAULT '',  -- wechat / alipay
    pay_id TEXT DEFAULT '',  -- 支付平台订单号
    created_at TEXT DEFAULT (datetime('now')),
    paid_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  -- 提现表
  CREATE TABLE IF NOT EXISTS withdrawals (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    amount INTEGER NOT NULL,  -- 金额（分）
    status TEXT DEFAULT 'pending',  -- pending / processing / completed / rejected
    method TEXT DEFAULT '',  -- wechat / alipay / bank
    account TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now')),
    completed_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- 收藏表
  CREATE TABLE IF NOT EXISTS favorites (
    user_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

module.exports = db;
