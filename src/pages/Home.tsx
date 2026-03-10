import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Terminal, Code, Check, Store } from 'lucide-react';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [personas, setPersonas] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 加载热门角色（persona类型）
        const personaData = await fetchProducts({ category: 'persona', limit: 6 });
        setPersonas(personaData.products || []);
        
        // 加载热门技能（skill类型）
        const skillData = await fetchProducts({ category: 'skill', limit: 6 });
        setSkills(skillData.products || []);
      } catch (err) {
        console.error('加载首页数据失败', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 模拟创作者数据
  const creators = [
    {
      name: 'AI架构师',
      avatar: '🧠',
      title: '企业级AI解决方案专家',
      description: '专注于企业级AI Agent架构设计，擅长复杂工作流编排。已发布20+企业级AI角色。'
    },
    {
      name: '全栈开发者',
      avatar: '👨‍💻',
      title: '全栈开发工程师',
      description: '技术栈覆盖前后端、DevOps，发布的技能全部经过生产环境验证。'
    },
    {
      name: '营销专家',
      avatar: '📈',
      title: '数字营销顾问',
      description: '10年营销经验，发布的内容创作、数据分析类技能广受好评。'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-24">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight max-w-4xl mx-auto">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              AI助手应用商店
            </span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-12">
            跳过提示词工程。获取经过操作员测试的AI配置，真正能交付工作 — 
            包含操作手册、工具配置和分步指南。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/listings" 
              className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-colors text-lg"
            >
              浏览商店
            </Link>
            <a 
              href="#how-it-works" 
              className="px-8 py-3.5 rounded-lg border border-neutral-700 text-neutral-300 hover:border-purple-500/50 hover:text-white transition-colors text-lg"
            >
              了解更多
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-neutral-800">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Zap,
                title: '预置配置',
                desc: '跳过数周的提示词工程'
              },
              {
                icon: Shield,
                title: '实战检验',
                desc: '来自真实生产AI设置的配置'
              },
              {
                icon: <Check />,
                title: '即插即用',
                desc: '几分钟内安装，今天就交付工作'
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {typeof item.icon === 'function' ? <item.icon className="w-6 h-6 text-white" /> : item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Personas */}
      <section className="py-20 border-t border-neutral-800">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">热门角色</h2>
            <Link to="/listings?type=persona" className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm">
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {personas.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="py-20 border-t border-neutral-800">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">热门技能</h2>
            <Link to="/listings?type=skill" className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm">
              查看全部 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map(s => <ProductCard key={s.id} product={s} />)}
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section id="creators" className="py-20 border-t border-neutral-800">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">精选创作者</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((c, i) => (
              <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-purple-500/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">
                    {c.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{c.name}</h3>
                    <p className="text-xs text-neutral-400">{c.title}</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 border-t border-neutral-800">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-16 text-center">如何使用</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '1', title: '浏览 & 购买', desc: '找到适合你工作流的角色或技能。一次付费，永久使用。' },
              { step: '2', title: '下载 & 安装', desc: '获取配置文件、提示词和设置指南。几分钟内安装完成。' },
              { step: '3', title: '交付真实工作', desc: '你的AI助手已准备就绪。立即开始委派任务。' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator API */}
      <section className="py-20 border-t border-neutral-800">
        <div className="container">
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-purple-300 text-sm font-medium mb-3">创作者 API</p>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">从终端发布技能</h2>
                <p className="text-neutral-400 mb-8">
                  构建一个技能或角色，然后通过单次API调用发布到ClawMart。你的AI助手可以创建列表、上传包和管理版本 — 全部以编程方式完成。
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { icon: Zap, text: '一条命令发布 — 几秒钟内创建列表并上传你的包' },
                    { icon: Terminal, text: 'AI原生工作流 — 你的OpenClaw可以自主构建和发布技能' },
                    { icon: Code, text: '版本管理 — 推送更新，你的买家自动获取最新版本' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <f.icon className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-neutral-300">{f.text}</span>
                    </div>
                  ))}
                </div>
                <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-colors">
                  获取API密钥
                </button>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <p className="text-neutral-500 mb-2"># 创建列表</p>
                <p className="text-green-400 mb-3">curl -X POST https://api.clawmart.cn/v1/listings \</p>
                <p className="text-neutral-300 mb-1 pl-4">-H "Authorization: Bearer $CLAWMART_API_KEY" \</p>
                <p className="text-neutral-300 mb-6 pl-4">{`-d '{"type":"skill","name":"我的技能",...}'`}</p>
                <p className="text-neutral-500 mb-2"># 上传包</p>
                <p className="text-green-400 mb-3">curl -X POST .../listings/{'{id}'}/versions \</p>
                <p className="text-neutral-300 mb-1 pl-4">-F "package=@SKILL.md" \</p>
                <p className="text-neutral-300 mb-6 pl-4">-F "changelog=首次发布"</p>
                <p className="text-neutral-500 mb-2"># 或者让你的AI来做</p>
                <p className="text-blue-400">"在ClawMart上创建一个每日站会总结技能"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-neutral-800 text-center">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">准备好开始了？</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            创建并销售你自己的AI角色和技能。每笔销售保留90%的收入，扣除支付处理费。
          </p>
          <button className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
            开始销售
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-neutral-800">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-purple-500" />
              <span className="font-semibold">ClawMart 中国</span>
            </div>
            <div className="flex gap-8 text-sm text-neutral-400">
              <a href="#" className="hover:text-white transition-colors">隐私政策</a>
              <a href="#" className="hover:text-white transition-colors">服务条款</a>
              <a href="#" className="hover:text-white transition-colors">联系我们</a>
              <a href="#" className="hover:text-white transition-colors">开发者文档</a>
            </div>
            <p className="text-sm text-neutral-500">© 2026 ClawMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
