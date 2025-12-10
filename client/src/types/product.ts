export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  photoUrl: string;
  specs: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type Touched = {
  name: boolean;
  price: boolean;
  category: boolean;
  description: boolean;
  photoUrl: boolean;
  specs: boolean;
};

export type CartContextType = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string | { seconds: number; nanoseconds: number } | null;
};

export type ProductCardProps = Product;
