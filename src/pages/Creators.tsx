import { creators } from '../data/products';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, DollarSign, Users } from 'lucide-react';

export default function Creators() {
  return (
    <main className="pt-24 pb-16">
      <div className="container">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              成为创作者
            </span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-8">
            把你的AI配置变成收入。上架你的角色和技能，每笔销售保留90%收入。
          </p>
          <Link
            to="/creator/submit"
            className="inline-block px-8 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-colors text-lg"
          >
            开始发布
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: DollarSign, value: '90%', label: '创作者分成', desc: '每笔交易的90%归你所有' },
            { icon: Users, value: '5000+', label: '活跃用户', desc: '持续增长的买家社区' },
            { icon: TrendingUp, value: '¥50万+', label: '月交易额', desc: '创作者累计收入' },
          ].map((stat, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center hover:border-purple-500/30 transition-colors">
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-purple-300 mb-2">{stat.label}</p>
              <p className="text-sm text-neutral-400">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* How to become a creator */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">如何成为创作者</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: '注册账号', desc: '免费注册成为ClawMart创作者，无需审核' },
              { step: '2', title: '创建作品', desc: '上传你的AI角色配置或技能包，填写详细说明' },
              { step: '3', title: '设定价格', desc: '自由定价，免费或付费均可，平台仅收10%服务费' },
              { step: '4', title: '开始赚钱', desc: '作品上架后立即开卖，收入实时到账，随时提现' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Creators */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">精选创作者</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((c, i) => (
              <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-purple-500/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                    {c.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{c.name}</h3>
                    <p className="text-xs text-neutral-400">{c.title}</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mb-4">{c.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500">已发布 3 个作品</span>
                  <span className="text-purple-400 flex items-center gap-1 cursor-pointer hover:text-purple-300">
                    查看作品 <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">准备好变现了吗？</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            无论你是AI工程师、运营专家还是内容创作者，你的经验都有价值。把你的AI配置方案上架，让更多人受益，同时获得持续收入。
          </p>
          <Link
            to="/creator/submit"
            className="inline-block px-8 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
          >
            立即入驻
          </Link>
        </div>
      </div>
    </main>
  );
}
