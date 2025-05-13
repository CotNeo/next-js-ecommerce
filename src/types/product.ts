export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  reviews: number;
  features: string[];
  specifications: {
    sensor: string;
    processor: string;
    video: string;
    connectivity: string;
    battery: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
} 