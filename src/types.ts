export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  specifications: { [key: string]: string };
  images: string[];
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  stock: number;
  status: 'draft' | 'published' | 'pending_review';
  variants?: string[];
  tags: string[];
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'customer';
  addresses: Address[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  type: 'home' | 'work';
  companyName?: string;
  gstNumber?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minOrderValue: number;
  expired: boolean;
  description: string;
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown supported
  coverImage: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  commentsCount: number;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  type: 'security' | 'inventory' | 'catalog' | 'order' | 'info';
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  gstAmount: number;
  total: number;
  address: Address;
  paymentMethod: 'upi' | 'razorpay' | 'stripe' | 'cod';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  isPaid: boolean;
  paidAt?: string;
  createdAt: string;
  invoiceNumber?: string;
}
