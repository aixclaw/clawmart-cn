import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Tag, Sparkles, Bot } from 'lucide-react';
import { fetchProducts, type Product } from '../api';

const types = [
  { label: '全部', value: '' },
  { label: '角色', value: 'persona', icon: Bot },
  { label: '技能', value: 'skill', icon: Sparkles },
];

const tags = ['全部', '管理', '产品', '工程', '内容', '效率', '运维', '调研', '营销'];

export default function Listings() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('');
  const [activeTag, setActiveTag] = useState('全部');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchProducts({
      category: activeType || undefined,
      tag: activeTag === '全部' ? undefined : activeTag,
      search: search || undefined,
    })
      .then(data => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeType, activeTag, search]);

  return (
    <main className="pt-24 pb-16">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">应用商店</h1>
            <p className="text-neutral-400 text-sm">共 {total} 个AI角色和技能可供选择</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="搜索角色或技能..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-500" />
            {types.map(t => (
              <button
                key={t.value}
                onClick={() => setActiveType(t.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeType === t.value
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-neutral-500" />
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeTag === tag
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-neutral-900 text-neutral-500 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-lg">没有找到匹配的结果</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <Link
                key={product.id}
                to={`/listings/${product.id}`}
                className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-purple-500/30 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      product.category === 'persona'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {product.category === 'persona' ? '角色' : '技能'}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs bg-neutral-800 text-neutral-400">
                      {product.tag}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-white">
                    {product.price === 0 ? '免费' : `¥${product.price}`}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-300 transition-colors">{product.name}</h3>
                <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>by {product.creator_name}</span>
                  <span>{product.downloads} 次下载</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
