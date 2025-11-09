export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  photoUrl: string;
};

export type Touched = {
  name: boolean;
  price: boolean;
  category: boolean;
  description: boolean;
  photoUrl: boolean;
};

export type ProductCardProps = {
  onBuyClick?: () => void;
} & Product;
