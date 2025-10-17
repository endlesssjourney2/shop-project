interface ProductCardProps {
  name: string;
  price: number;
  category: string;
}

const ProductCard = ({ name, price, category }: ProductCardProps) => {
  return (
    <div className="product-card">
      <h3 className="product-name">{name}</h3>
      <p className="product-category">{category}</p>
      <p className="product-price">${price}</p>
    </div>
  );
};

export default ProductCard;
