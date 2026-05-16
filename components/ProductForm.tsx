'use client';

import { useState, useEffect } from 'react';
import { Product, saveProduct } from '@/lib/firebase';

interface ProductFormProps {
  editProduct?: Product | null;
  onSave: () => void;
  onCancel?: () => void;
}

export default function ProductForm({ editProduct, onSave, onCancel }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const emptyForm = {
    handle: '',
    category: '',
    productName: '',
    variant: '',
    mfdBy: '',
    pkdBy: '',
    importedBy: '',
    fssaiLicense: '',
  };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editProduct) {
      setFormData({
        handle: editProduct.handle,
        category: editProduct.category,
        productName: editProduct.productName,
        variant: editProduct.variant,
        mfdBy: editProduct.mfdBy ?? editProduct.manufacturedBy ?? '',
        pkdBy: editProduct.pkdBy ?? '',
        importedBy: editProduct.importedBy ?? '',
        fssaiLicense: editProduct.fssaiLicense,
      });
    }
  }, [editProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const product: Product = {
        handle: formData.handle,
        category: formData.category,
        productName: formData.productName,
        variant: formData.variant,
        mfdBy: formData.mfdBy.trim() || undefined,
        pkdBy: formData.pkdBy.trim() || undefined,
        importedBy: formData.importedBy.trim() || undefined,
        fssaiLicense: formData.fssaiLicense,
        createdAt: editProduct?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveProduct(product);
      setFormData(emptyForm);
      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold text-[#235a49] mb-6">
        {editProduct ? 'Edit Product' : 'Add New Product'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Handle *
          </label>
          <input
            type="text"
            required
            disabled={!!editProduct}
            placeholder="e.g., multigrain-aata"
            value={formData.handle}
            onChange={(e) => setFormData({ ...formData, handle: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235a49] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all"
          />
          <p className="text-xs text-gray-400 mt-1.5">URL-friendly identifier (no spaces)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <input
            type="text"
            required
            placeholder="e.g., Atta, Oil, Ghee"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235a49] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g., Multigrain Atta"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235a49] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Variant
          </label>
          <input
            type="text"
            placeholder="e.g., 1Kg, 500g (optional)"
            value={formData.variant}
            onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235a49] focus:border-transparent transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            MFD BY
          </label>
          <textarea
            rows={3}
            placeholder="Manufacturer name &amp; address (leave blank if not applicable)"
            value={formData.mfdBy}
            onChange={(e) => setFormData({ ...formData, mfdBy: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235a49] focus:border-transparent transition-all resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PKD BY
          </label>
          <textarea
            rows={3}
            placeholder="Packer name &amp; address (leave blank if same as MFD)"
            value={formData.pkdBy}
            onChange={(e) => setFormData({ ...formData, pkdBy: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235a49] focus:border-transparent transition-all resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IMPORTED BY
          </label>
          <textarea
            rows={3}
            placeholder="Importer name &amp; address (only for imported products)"
            value={formData.importedBy}
            onChange={(e) => setFormData({ ...formData, importedBy: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235a49] focus:border-transparent transition-all resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            FSSAI License Number *
          </label>
          <input
            type="text"
            required
            placeholder="e.g., 11522027000428"
            value={formData.fssaiLicense}
            onChange={(e) => setFormData({ ...formData, fssaiLicense: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235a49] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-[#235a49] text-white font-medium rounded-lg hover:bg-[#1a4438] disabled:bg-[#235a49]/50 transition-all shadow-sm"
        >
          {loading ? 'Saving...' : editProduct ? 'Update Product' : 'Add Product'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 bg-white text-gray-600 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
