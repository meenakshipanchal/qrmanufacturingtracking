'use client';

import { useState, useEffect } from 'react';
import ProductForm from '@/components/ProductForm';
import ProductList from '@/components/ProductList';
import { Product, getAllProducts } from '@/lib/firebase';

// Password for admin access - change this to your desired password
const ADMIN_PASSWORD = 'anveshan@admin2024';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Check if already authenticated (session storage)
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleSave = () => {
    setEditProduct(null);
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#235a49] via-[#1a4538] to-[#0f2d23] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#235a49] rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-500 mt-2">Anveshan Farm - QR Tracking</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#235a49] focus:border-transparent outline-none transition-all"
                placeholder="Enter admin password"
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#235a49] text-white py-3 rounded-lg font-semibold hover:bg-[#1a4538] transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-[#235a49] hover:underline text-sm">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard (after login)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#235a49] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">QR Manufacturing Tracking</h1>
                <p className="text-white/70 text-sm">Admin Panel - Anveshan Farm</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all font-medium text-sm"
              >
                Back to Home
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/80 border border-red-400/50 rounded-lg hover:bg-red-500 transition-all font-medium text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Form Section */}
        <div className="mb-8">
          <ProductForm
            editProduct={editProduct}
            onSave={handleSave}
            onCancel={editProduct ? () => setEditProduct(null) : undefined}
          />
        </div>

        {/* Products List Section */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              All Products
            </h2>
            <span className="px-3 py-1 bg-[#235a49]/10 text-[#235a49] font-semibold rounded-full text-sm">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
          </div>
          {loading ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#235a49] border-t-transparent mx-auto"></div>
              <p className="mt-4 text-gray-500 font-medium">Loading products...</p>
            </div>
          ) : (
            <ProductList products={products} onEdit={handleEdit} onRefresh={fetchProducts} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
          Anveshan Farm - QR Manufacturing Tracking System
        </div>
      </footer>
    </div>
  );
}
