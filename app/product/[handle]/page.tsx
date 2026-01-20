import { getProductByHandle } from '@/lib/firebase';
import ProductDisplay from '@/components/ProductDisplay';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: 'Product Not Found - Anveshan Farm',
    };
  }

  return {
    title: `${product.productName} - Anveshan Farm`,
    description: `Manufacturing details for ${product.productName}. FSSAI: ${product.fssaiLicense}`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return <ProductDisplay product={product} />;
}
