import { Link, useLocation } from 'react-router-dom';
import { Store, Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Store className="w-5 h-5 text-purple-500" />
            <span>ClawMart</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm ${location.pathname === '/' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors'}`}
            >
              首页
            </Link>
            <Link 
              to="/listings" 
              className={`text-sm ${location.pathname === '/listings' ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors'}`}
            >
              应用商店
            </Link>
            <a 
              href="#creators" 
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              创作者
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              如何使用
            </a>
            <div className="flex items-center gap-4">
              <button className="p-2 text-neutral-400 hover:text-white">
                <Search className="w-4 h-4" />
              </button>
              <button className="p-2 text-neutral-400 hover:text-white">
                <User className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-neutral-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 flex flex-col gap-3 border-t border-neutral-800">
            <Link to="/" className="text-sm text-neutral-400 hover:text-white">首页</Link>
            <Link to="/listings" className="text-sm text-neutral-400 hover:text-white">应用商店</Link>
            <a href="#creators" className="text-sm text-neutral-400 hover:text-white">创作者</a>
            <a href="#how-it-works" className="text-sm text-neutral-400 hover:text-white">如何使用</a>
          </div>
        )}
      </div>
    </nav>
  );
}
