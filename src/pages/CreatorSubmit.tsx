import { useState } from 'react';
import { Upload, FileText, Tag, DollarSign, Image, Check } from 'lucide-react';

export default function CreatorSubmit() {
  const [formData, setFormData] = useState({
    name: '',
    type: 'persona',
    tag: '管理',
    price: '',
    description: '',
    longDescription: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="pt-24 pb-16">
        <div className="container max-w-2xl text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">提交成功！</h1>
          <p className="text-neutral-400 mb-8">
            你的作品已提交审核，我们会在24小时内完成审核并通知你。审核通过后即可上架销售。
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium"
          >
            继续提交新作品
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">发布新作品</h1>
        <p className="text-neutral-400 mb-10">上传你的AI角色配置或技能包，开始赚钱</p>

        <div className="space-y-8">
          {/* Basic Info */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" /> 基本信息
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">作品名称 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="例如：AI CEO 全能助手"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">类型 *</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="persona">角色 (Persona)</option>
                    <option value="skill">技能 (Skill)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">分类 *</label>
                  <select
                    value={formData.tag}
                    onChange={e => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    {['管理', '产品', '工程', '内容', '效率', '运维', '调研', '营销'].map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-400" /> 定价
            </h2>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">价格 (¥)</label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                placeholder="0 表示免费"
                className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none transition-colors"
              />
              <p className="text-xs text-neutral-500 mt-2">设为 0 即为免费作品。付费作品你将获得 90% 的收入。</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-purple-400" /> 作品描述
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">简短描述 *</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="一句话描述你的作品，展示在列表页"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">详细说明 *</label>
                <textarea
                  value={formData.longDescription}
                  onChange={e => setFormData({ ...formData, longDescription: e.target.value })}
                  rows={6}
                  placeholder="详细介绍你的作品：功能特点、使用场景、包含文件..."
                  className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Upload */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-400" /> 上传配置包
            </h2>
            <div className="border-2 border-dashed border-neutral-700 rounded-xl p-10 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-neutral-500 mx-auto mb-4" />
              <p className="text-neutral-300 mb-2">拖拽文件到此处，或点击上传</p>
              <p className="text-xs text-neutral-500">支持 .md, .zip, .tar.gz 格式，最大 50MB</p>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Image className="w-5 h-5 text-purple-400" /> 封面图片（可选）
            </h2>
            <div className="border-2 border-dashed border-neutral-700 rounded-xl p-10 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
              <Image className="w-10 h-10 text-neutral-500 mx-auto mb-4" />
              <p className="text-neutral-300 mb-2">上传封面图片</p>
              <p className="text-xs text-neutral-500">推荐尺寸 1200x630，支持 .jpg, .png</p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-500">提交后将在24小时内审核</p>
            <button
              onClick={() => setSubmitted(true)}
              className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              提交审核
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
