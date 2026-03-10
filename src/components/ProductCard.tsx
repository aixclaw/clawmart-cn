import { Link } from 'react-router-dom';
import type { Product } from '../data/products';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/listings/${product.id}`}
      className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-800/70 hover:border-purple-500/30 transition-all duration-200 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 font-medium">
          {product.tag}
        </span>
        <span className="text-xl font-bold text-purple-300">
          {product.price === 0 ? '免费' : `¥${product.price}`}
        </span>
      </div>
      <h3 className="text-base font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-neutral-400 flex-1 mb-4 line-clamp-2">
        {product.description}
      </p>
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <span>{product.creator}</span>
        <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
          {product.price === 0 ? '获取' : '购买'}
        </span>
      </div>
    </Link>
  );
}
