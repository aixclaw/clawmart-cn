const db = require('./db');
const { v4: uuid } = require('uuid');

// 插入初始商品数据
const products = [
  { name: '你的AI首席执行官', description: '交付产品、管理代码、处理沟通、记住一切、运营你的业务', long_description: '一个全能型AI CEO角色配置包，包含 SOUL.md + IDENTITY.md + AGENTS.md + 完整技能集。安装后你的AI助手将具备产品经理、技术负责人、行政助理的综合能力，帮你管理日常业务的方方面面。', price: 69900, category: 'persona', tag: '管理', features: '["产品管理","代码审查","团队协调","邮件处理","日程管理"]' },
  { name: 'AI Agent 基础套件', description: 'SOUL.md + IDENTITY.md + AGENTS.md — 每个AI助手必备的3个核心文件，免费', long_description: '从零开始搭建你的AI助手？这是你需要的基础套件。包含经过生产验证的三个核心配置文件模板，以及详细的填写指南。', price: 0, category: 'persona', tag: '产品', features: '["SOUL.md 模板","IDENTITY.md 模板","AGENTS.md 模板","快速上手指南"]' },
  { name: '工程师模式', description: '操作员模式的工程角色，可靠的生产级交付能力', long_description: '专业的AI工程师角色，具备严格的代码质量把控意识。支持多种编程语言，擅长架构设计、代码审查和自动化部署。', price: 29900, category: 'persona', tag: '工程', features: '["代码审查","架构设计","安全检查","CI/CD","技术文档"]' },
  { name: '内容营销专家', description: '内容营销AI，多Agent写作流水线 — Grok调研、Opus起草、品牌声音系统', long_description: '一套完整的内容营销AI配置，内置多Agent协作流水线。自动完成从选题调研、内容创作到发布优化的全流程。', price: 34900, category: 'persona', tag: '内容', features: '["内容策划","文案撰写","SEO优化","社媒运营","数据分析"]' },
  { name: '多Agent团队系统', description: '醒来就有完成的工作。10个Agent处理内容、调研、构建和收入 — 自动化', long_description: '一套完整的多Agent团队配置系统。包含项目经理、研究员、工程师、设计师等10个专业角色，支持自动任务分配和协作。', price: 29900, category: 'persona', tag: '效率', features: '["10个专业Agent","自动调度","任务分配","进度追踪","结果汇报"]' },
  { name: '运维专家', description: '保持你的服务运行、健康、盈利', long_description: '专业的运维角色配置，帮助你的AI服务保持稳定运行。自动检测异常、执行修复、优化性能。', price: 0, category: 'persona', tag: '运维', features: '["服务监控","自动修复","日志分析","性能优化","告警通知"]' },
  { name: '持久化编程会话', description: '使用tmux运行持久、自修复的AI编码会话，带Ralph循环和完成钩子', long_description: '让你的AI编程助手拥有持久化会话能力。即使断开连接，任务也会继续执行，完成后自动通知你。', price: 0, category: 'skill', tag: '工程', features: '["tmux集成","断点续传","自动保存","会话恢复"]' },
  { name: 'YouTube工具包', description: '完整的YouTube工具包 — 字幕、搜索、频道、播放列表和元数据一站式集成', long_description: '一站式视频平台操作工具包，支持主流视频平台的内容分析和管理。', price: 0, category: 'skill', tag: '调研', features: '["字幕提取","视频搜索","频道分析","播放列表管理","元数据提取"]' },
  { name: '运营操作手册', description: '将玩具聊天机器人变成生产操作员的操作手册', long_description: '把一个普通聊天机器人变成专业的生产级操作员所需的一切：会话纪律、记忆模式、安全规则和沟通礼仪。', price: 0, category: 'skill', tag: '运维', features: '["会话管理","记忆模式","安全规则","沟通礼仪"]' },
  { name: 'Twitter/X增长', description: '通过公开构建从零增长Twitter/X — 来自真实实验的战术', long_description: '基于真实增长实验总结的社交媒体运营技能包，从零开始建立品牌影响力。', price: 0, category: 'skill', tag: '营销', features: '["内容策略","互动增长","数据追踪","竞品分析"]' },
  { name: '内容创意生成器', description: 'v2.0 — 支持摄入门控、记忆感知和多Agent交接', long_description: '第二代内容创意生成技能，支持智能化的内容审核门控机制和多Agent协作交接。', price: 0, category: 'skill', tag: '营销', features: '["创意生成","内容门控","记忆感知","多Agent交接"]' },
  { name: '数据分析工具箱', description: '从数据采集到可视化报告的完整分析流程', long_description: '完整的数据分析技能包，让你的AI助手具备从原始数据到洞察报告的全流程处理能力。', price: 4900, category: 'skill', tag: '调研', features: '["数据采集","清洗处理","统计分析","可视化报告"]' },
];

// 创建管理员账号
const adminId = uuid();
const insertUser = db.prepare('INSERT OR IGNORE INTO users (id, email, nickname, role) VALUES (?, ?, ?, ?)');
insertUser.run(adminId, 'admin@clawmart.cn', 'ClawMart官方', 'admin');

// 插入商品
const insertProduct = db.prepare('INSERT OR IGNORE INTO products (id, name, description, long_description, price, category, tag, features, creator_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');

const insertMany = db.transaction(() => {
  for (const p of products) {
    insertProduct.run(uuid(), p.name, p.description, p.long_description, p.price, p.category, p.tag, p.features, adminId);
  }
});

// 检查是否已有数据
const count = db.prepare('SELECT COUNT(*) as count FROM products').get();
if (count.count === 0) {
  insertMany();
  console.log(`✅ 已插入 ${products.length} 个商品`);
} else {
  console.log(`📦 数据库已有 ${count.count} 个商品，跳过初始化`);
}
