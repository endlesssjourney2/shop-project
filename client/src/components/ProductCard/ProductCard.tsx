import type { ProductCardProps } from "../../types/product";
import s from "./ProductCard.module.css";

const ProductCard = ({ name, price, category }: ProductCardProps) => {
  return (
    <div className={s.productCard}>
      <h3 className={s.productName}>{name}</h3>
      <p className={s.productCategory}>{category}</p>
      <p className={s.productPrice}>${price}</p>
    </div>
  );
};

export default ProductCard;
