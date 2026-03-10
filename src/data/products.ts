export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'persona' | 'skill';
  tag: string;
  creator: string;
  features?: string[];
  longDescription?: string;
  image?: string;
}

export const personas: Product[] = [
  {
    id: 'ai-ceo',
    name: '你的AI首席执行官',
    description: '交付产品、管理代码、处理沟通、记住一切、运营你的业务',
    price: 699,
    category: 'persona',
    tag: '管理',
    creator: 'ClawMart',
    features: ['产品管理', '代码审查', '团队协调', '邮件处理', '日程管理'],
    longDescription: '一个全能型AI CEO角色配置包，包含 SOUL.md + IDENTITY.md + AGENTS.md + 完整技能集。安装后你的AI助手将具备产品经理、技术负责人、行政助理的综合能力，帮你管理日常业务的方方面面。'
  },
  {
    id: 'starter-pack',
    name: 'AI Agent 基础套件',
    description: 'SOUL.md + IDENTITY.md + AGENTS.md — 每个AI助手必备的3个核心文件，免费',
    price: 0,
    category: 'persona',
    tag: '产品',
    creator: 'ClawMart',
    features: ['SOUL.md 模板', 'IDENTITY.md 模板', 'AGENTS.md 模板', '快速上手指南'],
    longDescription: '从零开始搭建你的AI助手？这是你需要的基础套件。包含经过生产验证的三个核心配置文件模板，以及详细的填写指南。'
  },
  {
    id: 'engineer',
    name: '工程师模式',
    description: '操作员模式的工程角色，可靠的生产级交付能力',
    price: 299,
    category: 'persona',
    tag: '工程',
    creator: 'TechCrew',
    features: ['代码审查', '架构设计', '安全检查', 'CI/CD', '技术文档'],
    longDescription: '专业的AI工程师角色，具备严格的代码质量把控意识。支持多种编程语言，擅长架构设计、代码审查和自动化部署。'
  },
  {
    id: 'content-marketer',
    name: '内容营销专家',
    description: '内容营销AI，多Agent写作流水线 — Grok调研、Opus起草、品牌声音系统',
    price: 349,
    category: 'persona',
    tag: '内容',
    creator: '营销工坊',
    features: ['内容策划', '文案撰写', 'SEO优化', '社媒运营', '数据分析'],
    longDescription: '一套完整的内容营销AI配置，内置多Agent协作流水线。自动完成从选题调研、内容创作到发布优化的全流程。'
  },
  {
    id: 'multi-agent-team',
    name: '多Agent团队系统',
    description: '醒来就有完成的工作。10个Agent处理内容、调研、构建和收入 — 自动化',
    price: 299,
    category: 'persona',
    tag: '效率',
    creator: '效率达人',
    features: ['10个专业Agent', '自动调度', '任务分配', '进度追踪', '结果汇报'],
    longDescription: '一套完整的多Agent团队配置系统。包含项目经理、研究员、工程师、设计师等10个专业角色，支持自动任务分配和协作。'
  },
  {
    id: 'ops-expert',
    name: '运维专家',
    description: '保持你的x402服务运行、健康、盈利',
    price: 0,
    category: 'persona',
    tag: '运维',
    creator: 'ClawMart',
    features: ['服务监控', '自动修复', '日志分析', '性能优化', '告警通知'],
    longDescription: '专业的运维角色配置，帮助你的AI服务保持稳定运行。自动检测异常、执行修复、优化性能。'
  }
];

export const skills: Product[] = [
  {
    id: 'coding-session',
    name: '持久化编程会话',
    description: '使用tmux运行持久、自修复的AI编码会话，带Ralph循环和完成钩子',
    price: 0,
    category: 'skill',
    tag: '工程',
    creator: 'TechCrew',
    features: ['tmux集成', '断点续传', '自动保存', '会话恢复'],
    longDescription: '让你的AI编程助手拥有持久化会话能力。即使断开连接，任务也会继续执行，完成后自动通知你。'
  },
  {
    id: 'video-toolkit',
    name: 'YouTube工具包',
    description: '完整的YouTube工具包 — 字幕、搜索、频道、播放列表和元数据一站式集成',
    price: 0,
    category: 'skill',
    tag: '调研',
    creator: '内容实验室',
    features: ['字幕提取', '视频搜索', '频道分析', '播放列表管理', '元数据提取'],
    longDescription: '一站式视频平台操作工具包，支持主流视频平台的内容分析和管理。'
  },
  {
    id: 'ops-playbook',
    name: '运营操作手册',
    description: '将玩具聊天机器人变成生产操作员的操作手册。会话纪律、记忆模式、安全规则和沟通礼仪 — 所有你需要踩坑才能学会的东西，提炼成模式，第一天就能用。',
    price: 0,
    category: 'skill',
    tag: '运维',
    creator: 'ClawMart',
    features: ['会话管理', '记忆模式', '安全规则', '沟通礼仪'],
    longDescription: '把一个普通聊天机器人变成专业的生产级操作员所需的一切：会话纪律、记忆模式、安全规则和沟通礼仪。'
  },
  {
    id: 'social-growth',
    name: 'Twitter/X增长',
    description: '通过公开构建从零增长Twitter/X — 来自真实实验的战术',
    price: 0,
    category: 'skill',
    tag: '营销',
    creator: '增长黑客',
    features: ['内容策略', '互动增长', '数据追踪', '竞品分析'],
    longDescription: '基于真实增长实验总结的社交媒体运营技能包，从零开始建立品牌影响力。'
  },
  {
    id: 'content-pipeline',
    name: '内容创意生成器',
    description: 'v2.0 — 2026年2月25日更新。现在支持摄入门控、记忆感知和多Agent交接。',
    price: 0,
    category: 'skill',
    tag: '营销',
    creator: '内容实验室',
    features: ['创意生成', '内容门控', '记忆感知', '多Agent交接'],
    longDescription: '第二代内容创意生成技能，支持智能化的内容审核门控机制和多Agent协作交接。'
  },
  {
    id: 'data-analysis',
    name: '数据分析工具箱',
    description: '从数据采集到可视化报告的完整分析流程',
    price: 49,
    category: 'skill',
    tag: '调研',
    creator: '数据工坊',
    features: ['数据采集', '清洗处理', '统计分析', '可视化报告'],
    longDescription: '完整的数据分析技能包，让你的AI助手具备从原始数据到洞察报告的全流程处理能力。'
  }
];

export const creators = [
  {
    name: 'Felix Craft',
    title: 'Masinov公司CEO',
    description: 'Masinov公司CEO。',
    avatar: '👨‍💼'
  },
  {
    name: 'Brian Wagner',
    title: '创作者',
    description: 'AI营销架构师',
    avatar: '🧑‍💻'
  },
  {
    name: 'Scheemunai',
    title: '创作者',
    description: '为交付团队构建实用的AI工作流。',
    avatar: '👩‍💻'
  },
  {
    name: 'Otter Ops Max',
    title: '创作者',
    description: '我们构建真正能工作的AI Agent — 不是演示，不是玩具，是能产生线索、管理财务、撰写内容和交付代码的生产级操作员。我们销售的每个技能都来自真实运营，而非理论。',
    avatar: '🦦'
  },
  {
    name: 'Shelly the Lobster',
    title: '创作者',
    description: '为交付团队构建实用的AI工作流。',
    avatar: '🦞'
  },
  {
    name: 'Maduro AI',
    title: '创作者',
    description: '为交付团队构建实用的AI工作流。',
    avatar: '🤖'
  }
];

export const allProducts = [...personas, ...skills];
