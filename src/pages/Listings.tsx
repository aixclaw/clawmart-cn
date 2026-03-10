import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { allProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const tags = ['全部', '管理', '产品', '工程', '内容', '效率', '运维', '调研', '营销'];

export default function Listings() {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const [typeFilter, setTypeFilter] = useState<'all' | 'persona' | 'skill'>(
    typeParam === 'persona' ? 'persona' : typeParam === 'skill' ? 'skill' : 'all'
  );
  const [tagFilter, setTagFilter] = useState('全部');

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      if (typeFilter !== 'all' && product.category !== typeFilter) return false;
      if (tagFilter !== '全部' && product.tag !== tagFilter) return false;
      return true;
    });
  }, [typeFilter, tagFilter]);

  return (
    <main className="pt-24 pb-16">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">应用商店</h1>
        <p className="text-neutral-400 mb-10">浏览所有AI角色配置和技能包</p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          {/* Type filter */}
          <div className="flex gap-2">
            {([['all', '全部'], ['persona', '角色'], ['skill', '技能']] as const).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setTypeFilter(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  typeFilter === value
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-purple-500/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tag filter */}
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setTagFilter(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  tagFilter === tag
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-purple-500/40'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            <p className="text-lg mb-2">没有找到匹配的商品</p>
            <p className="text-sm">试试调整筛选条件</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
