'use client';

import { useState } from 'react';
import { Product, deleteProduct } from '@/lib/firebase';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onRefresh: () => void;
}

export default function ProductList({ products, onEdit, onRefresh }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const filteredProducts = products.filter(
    (product) =>
      product.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (handle: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setDeleting(handle);
    try {
      await deleteProduct(handle);
      onRefresh();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Search Header */}
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <div className="relative">
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by handle, product name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235a49] focus:border-transparent transition-all bg-white"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="p-13 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">
            {products.length === 0 ? 'No products added yet' : 'No products match your search'}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {products.length === 0 ? 'Add your first product using the form above' : 'Try a different search term'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#235a49] text-white">
                <th className="px-5 py-3.5 text-left text-sm font-semibold">Product</th>
                <th className="px-5 py-3.5 text-left text-sm font-semibold">Category</th>
                <th className="px-5 py-3.5 text-left text-sm font-semibold">Variant</th>
                <th className="px-5 py-3.5 text-left text-sm font-semibold">FSSAI</th>
                <th className="px-5 py-3.5 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.handle} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900">{product.productName}</div>
                    <div className="text-sm text-gray-400 mt-0.5">{product.handle}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex px-2.5 py-1 bg-[#235a49]/10 text-[#235a49] text-sm font-medium rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{product.variant || '-'}</td>
                  <td className="px-5 py-4 text-sm text-gray-600 font-mono">{product.fssaiLicense}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="px-3 py-1.5 text-sm font-medium bg-[#235a49] text-white rounded-lg hover:bg-[#1a4438] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.handle)}
                        disabled={deleting === product.handle}
                        className="px-3 py-1.5 text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        {deleting === product.handle ? '...' : 'Delete'}
                      </button>
                      <a
                        href={`/product/${product.handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        View
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
