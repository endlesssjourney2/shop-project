import type { FC } from "react";
import type { ProductCardProps } from "../../types/product";
import s from "./AdminProductCard.module.css";

const AdminProductCard: FC<ProductCardProps> = ({
  name,
  price,
  category,
  description,
  photoUrl,
}) => {
  return (
    <div className={s.productCard}>
      <h2 className={s.productCardName}>Name: {name}</h2>
      <h3 className={s.productCardPrice}>Price: ${price}</h3>
      <p className={s.productCardCategory}>Category: {category}</p>
      <img src={photoUrl} width="50" />
      <p>{description}</p>
    </div>
  );
};

export default AdminProductCard;
