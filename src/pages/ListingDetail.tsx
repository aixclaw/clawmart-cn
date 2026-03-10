import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, ShoppingCart, Check } from 'lucide-react';
import { allProducts } from '../data/products';

export default function ListingDetail() {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return (
      <main className="pt-24 pb-16 container text-center">
        <h1 className="text-2xl font-bold mb-4">商品未找到</h1>
        <Link to="/listings" className="text-purple-400 hover:text-purple-300">返回商店</Link>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container">
        <Link to="/listings" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 返回商店
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 font-medium">
                {product.tag}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-400">
                {product.category === 'persona' ? '角色' : '技能'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-neutral-400 text-lg mb-8">{product.description}</p>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">详细说明</h2>
              <p className="text-neutral-300 leading-relaxed">
                {product.longDescription || product.description}
              </p>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">包含功能</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400 shrink-0" />
                      <span className="text-neutral-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-8">
                <p className="text-4xl font-bold text-purple-300 mb-2">
                  {product.price === 0 ? '免费' : `¥${product.price}`}
                </p>
                <p className="text-xs text-neutral-400">一次购买，永久使用</p>
              </div>
              <button className="w-full py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-colors mb-4">
                {product.price === 0 ? (
                  <><Download className="w-5 h-5" /> 立即获取</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> 立即购买</>
                )}
              </button>
              <p className="text-xs text-neutral-400 text-center mb-8">支持微信 / 支付宝</p>

              <div className="border-t border-neutral-800 pt-6 mb-6">
                <h3 className="text-sm font-semibold mb-4">创作者</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-lg">
                    {product.creator.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{product.creator}</p>
                    <p className="text-xs text-neutral-400">认证创作者</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-6">
                <h3 className="text-sm font-semibold mb-4">配置包内容</h3>
                <div className="space-y-3 text-sm text-neutral-300">
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" /> SOUL.md — 角色灵魂文件
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" /> IDENTITY.md — 身份配置
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" /> AGENTS.md — Agent设置
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" /> 安装指南
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
