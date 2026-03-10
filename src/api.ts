const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3180';

function getToken() {
  return localStorage.getItem('clawmart_token');
}

async function request(path: string, options?: RequestInit) {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers: { ...headers, ...options?.headers } });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '请求失败');
  return data;
}

// ==================== 用户 ====================
export async function register(email: string, password: string, nickname?: string) {
  const data = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, nickname }),
  });
  localStorage.setItem('clawmart_token', data.token);
  localStorage.setItem('clawmart_user', JSON.stringify(data.user));
  return data;
}

export async function login(email: string, password: string) {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem('clawmart_token', data.token);
  localStorage.setItem('clawmart_user', JSON.stringify(data.user));
  return data;
}

export function logout() {
  localStorage.removeItem('clawmart_token');
  localStorage.removeItem('clawmart_user');
}

export function getCurrentUser() {
  const raw = localStorage.getItem('clawmart_user');
  return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn() {
  return !!getToken();
}

export async function fetchMe() {
  return request('/api/auth/me');
}

// ==================== 商品 ====================
export interface Product {
  id: string;
  name: string;
  description: string;
  long_description: string;
  price: number;
  category: 'persona' | 'skill';
  tag: string;
  features: string[];
  creator_id: string;
  creator_name: string;
  creator_avatar?: string;
  status: string;
  downloads: number;
  sales: number;
  cover_url: string;
  created_at: string;
}

export interface ProductList {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export async function fetchProducts(params?: { category?: string; tag?: string; search?: string; page?: number; limit?: number }): Promise<ProductList> {
  const query = new URLSearchParams();
  if (params?.category) query.set('category', params.category);
  if (params?.tag) query.set('tag', params.tag);
  if (params?.search) query.set('search', params.search);
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  return request(`/api/products?${query.toString()}`);
}

export async function fetchProduct(id: string): Promise<Product> {
  return request(`/api/products/${id}`);
}

export async function createProduct(data: { name: string; description: string; long_description?: string; price?: number; category: string; tag?: string; features?: string[] }) {
  return request('/api/products', { method: 'POST', body: JSON.stringify(data) });
}

// ==================== 订单 ====================
export async function createOrder(productId: string, payMethod = 'wechat') {
  return request('/api/orders', { method: 'POST', body: JSON.stringify({ product_id: productId, pay_method: payMethod }) });
}

export async function fetchOrders() {
  return request('/api/orders');
}

// ==================== 创作者 ====================
export async function fetchCreatorProducts() {
  return request('/api/creator/products');
}

export async function fetchCreatorStats() {
  return request('/api/creator/stats');
}

export async function requestWithdraw(amount: number, method: string, account: string) {
  return request('/api/creator/withdraw', { method: 'POST', body: JSON.stringify({ amount, method, account }) });
}
