'use client';

import { useState, useEffect } from 'react';
import ProductForm from '@/components/ProductForm';
import ProductList from '@/components/ProductList';
import { Product, getAllProducts } from '@/lib/firebase';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

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
    fetchProducts();
  }, []);

  const handleSave = () => {
    setEditProduct(null);
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <a
              href="/"
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all font-medium text-sm"
            >
              Back to Home
            </a>
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
