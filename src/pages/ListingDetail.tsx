import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingCart, Download, Bot, Sparkles } from 'lucide-react';
import { fetchProduct, createOrder, isLoggedIn, type Product } from '../api';

export default function ListingDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProduct(id)
      .then(setProduct)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handlePurchase = async () => {
    if (!product) return;
    if (!isLoggedIn()) {
      window.location.href = '/login';
      return;
    }
    setPurchasing(true);
    try {
      const result = await createOrder(product.id);
      if (result.status === 'paid' || product.price === 0) {
        setPurchased(true);
      } else {
        alert(`请完成支付：${result.pay_url}`);
      }
    } catch (err: any) {
      alert(err.message || '购买失败');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <main className="pt-24 pb-16">
        <div className="container flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-24 pb-16">
        <div className="container text-center py-20">
          <p className="text-neutral-400 text-lg mb-4">商品不存在</p>
          <Link to="/listings" className="text-purple-400 hover:text-purple-300">返回商店</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container">
        <Link to="/listings" className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 返回商店
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 ${
                  product.category === 'persona'
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {product.category === 'persona' ? <><Bot className="w-3.5 h-3.5" /> 角色</> : <><Sparkles className="w-3.5 h-3.5" /> 技能</>}
                </span>
                <span className="px-3 py-1.5 rounded-full text-sm bg-neutral-800 text-neutral-400">{product.tag}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg text-neutral-400">{product.description}</p>
            </div>

            {/* Description */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">详细说明</h2>
              <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">{product.long_description}</p>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">包含功能</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-neutral-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold mb-1">
                  {product.price === 0 ? '免费' : `¥${product.price}`}
                </p>
                {product.price > 0 && (
                  <p className="text-xs text-neutral-500">一次购买，永久使用</p>
                )}
              </div>

              {purchased ? (
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-green-400 font-medium mb-2">获取成功！</p>
                  <button className="w-full py-3 rounded-lg bg-neutral-800 text-white font-medium flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> 下载配置包
                  </button>
                </div>
              ) : (
                <button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {purchasing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      {product.price === 0 ? '免费获取' : '立即购买'}
                    </>
                  )}
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-neutral-800 space-y-3 text-sm text-neutral-400">
                <div className="flex justify-between">
                  <span>下载次数</span>
                  <span className="text-white">{product.downloads}</span>
                </div>
                <div className="flex justify-between">
                  <span>创作者</span>
                  <span className="text-white">{product.creator_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>发布时间</span>
                  <span className="text-white">{new Date(product.created_at).toLocaleDateString('zh-CN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
