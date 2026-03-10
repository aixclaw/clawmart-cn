import { useState } from 'react';
import { Store, Mail, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');

  return (
    <main className="pt-24 pb-16 flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold mb-4">
            <Store className="w-6 h-6 text-purple-500" />
            <span>ClawMart</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">
            {mode === 'login' ? '登录' : '注册'}
          </h1>
          <p className="text-neutral-400 text-sm">
            {mode === 'login' ? '欢迎回来，继续你的AI之旅' : '加入ClawMart，开始使用或销售AI配置'}
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                loginMethod === 'phone'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'bg-neutral-800 text-neutral-400 border border-transparent'
              }`}
            >
              <Phone className="w-4 h-4 inline mr-1" /> 手机号
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                loginMethod === 'email'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'bg-neutral-800 text-neutral-400 border border-transparent'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-1" /> 邮箱
            </button>
          </div>

          <div className="space-y-4">
            {loginMethod === 'phone' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">手机号</label>
                  <div className="flex gap-2">
                    <select className="w-20 px-2 py-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-sm">
                      <option>+86</option>
                      <option>+852</option>
                      <option>+886</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="请输入手机号"
                      className="flex-1 px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">验证码</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="请输入验证码"
                      className="flex-1 px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none transition-colors"
                    />
                    <button className="px-4 py-3 rounded-lg bg-neutral-800 text-purple-300 text-sm font-medium hover:bg-neutral-700 transition-colors whitespace-nowrap">
                      获取验证码
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">邮箱</label>
                  <input
                    type="email"
                    placeholder="请输入邮箱地址"
                    className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">密码</label>
                  <input
                    type="password"
                    placeholder="请输入密码"
                    className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </>
            )}

            <button className="w-full py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-colors">
              {mode === 'login' ? '登录' : '注册'}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-neutral-800" />
            <span className="text-xs text-neutral-500">或</span>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 rounded-lg bg-[#07C160] text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <MessageSquare className="w-4 h-4" /> 微信登录
            </button>
            <button className="py-3 rounded-lg bg-neutral-800 text-neutral-300 text-sm font-medium flex items-center justify-center gap-2 hover:bg-neutral-700 transition-colors">
              <Store className="w-4 h-4" /> GitHub
            </button>
          </div>

          {/* Switch mode */}
          <p className="text-center text-sm text-neutral-400 mt-6">
            {mode === 'login' ? (
              <>还没有账号？<button onClick={() => setMode('register')} className="text-purple-400 hover:text-purple-300">立即注册</button></>
            ) : (
              <>已有账号？<button onClick={() => setMode('login')} className="text-purple-400 hover:text-purple-300">立即登录</button></>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
