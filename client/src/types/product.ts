export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  photoUrl: string;
  specs: string;
};

export type Touched = {
  name: boolean;
  price: boolean;
  category: boolean;
  description: boolean;
  photoUrl: boolean;
  specs: boolean;
};

export type ProductCardProps = Product;
