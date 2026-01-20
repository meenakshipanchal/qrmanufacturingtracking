import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2l8TJCtDP8y4DdBFeM34gFDt6B8iISRo",
  authDomain: "qrmanufacturingtracking.firebaseapp.com",
  projectId: "qrmanufacturingtracking",
  storageBucket: "qrmanufacturingtracking.firebasestorage.app",
  messagingSenderId: "285894723154",
  appId: "1:285894723154:web:06101925b9dd0d5f1f418b",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Product type definition
export interface Product {
  handle: string;
  category: string;
  productName: string;
  variant: string;
  manufacturedBy: string;
  fssaiLicense: string;
  createdAt: string;
  updatedAt: string;
}

// Collection reference
const productsCollection = collection(db, 'qrmanufacturingtracking');

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  const q = query(productsCollection, orderBy('updatedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as Product);
}

// Get product by handle
export async function getProductByHandle(handle: string): Promise<Product | null> {
  const docRef = doc(db, 'qrmanufacturingtracking', handle);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Product;
  }
  return null;
}

// Save product (create or update)
export async function saveProduct(product: Product): Promise<void> {
  const docRef = doc(db, 'qrmanufacturingtracking', product.handle);
  await setDoc(docRef, {
    ...product,
    updatedAt: new Date().toISOString(),
  });
}

// Delete product
export async function deleteProduct(handle: string): Promise<void> {
  const docRef = doc(db, 'qrmanufacturingtracking', handle);
  await deleteDoc(docRef);
}

export { db };
