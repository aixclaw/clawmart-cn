import { Link, useLocation } from 'react-router-dom';
import { Store, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
            <Link to="/" className={`text-sm ${isActive('/') ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors'}`}>
              首页
            </Link>
            <Link to="/listings" className={`text-sm ${isActive('/listings') ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors'}`}>
              应用商店
            </Link>
            <Link to="/creators" className={`text-sm ${isActive('/creators') ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors'}`}>
              创作者
            </Link>
            <Link to="/creator/submit" className={`text-sm ${isActive('/creator/submit') ? 'text-white' : 'text-neutral-400 hover:text-white transition-colors'}`}>
              发布作品
            </Link>
            <div className="flex items-center gap-3">
              <button className="p-2 text-neutral-400 hover:text-white">
                <Search className="w-4 h-4" />
              </button>
              <Link to="/login" className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-colors">
                登录
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-neutral-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 flex flex-col gap-3 border-t border-neutral-800">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-sm text-neutral-400 hover:text-white">首页</Link>
            <Link to="/listings" onClick={() => setMobileMenuOpen(false)} className="text-sm text-neutral-400 hover:text-white">应用商店</Link>
            <Link to="/creators" onClick={() => setMobileMenuOpen(false)} className="text-sm text-neutral-400 hover:text-white">创作者</Link>
            <Link to="/creator/submit" onClick={() => setMobileMenuOpen(false)} className="text-sm text-neutral-400 hover:text-white">发布作品</Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-sm text-purple-400 hover:text-purple-300">登录</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
