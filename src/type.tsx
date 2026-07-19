export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface Product {
  _id: string;
  slug:string;
  title: string;
  instagram:string;
  category: Category;
  description: string;
  price: number;
  offerPrice: number;
  stock: number;
  image: string;
  customizable: boolean;
  featured: boolean;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductResponse {
  success: boolean;
  data: Product[];
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}