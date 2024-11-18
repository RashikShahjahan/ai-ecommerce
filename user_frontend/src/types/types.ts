export interface ProductVariant {
  id: string;
  color?: string;
  size?: string;
  sku: string;
  stock: number;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: Category;
  variants: ProductVariant[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
}
