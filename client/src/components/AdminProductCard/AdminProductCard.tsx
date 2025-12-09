import type { FC } from "react";
import type { Product } from "../../types/product";
import s from "./AdminProductCard.module.css";

const AdminProductCard: FC<Product> = ({
  name,
  price,
  category,
  description,
  photoUrl,
  specs,
  opis,
}) => {
  return (
    <div className={s.productCard}>
      <h2 className={s.productCardName}>Name: {name}</h2>
      <h3 className={s.productCardPrice}>Price: ${price}</h3>
      <p className={s.productCardCategory}>Category: {category}</p>
      <img src={photoUrl} width="50" />
      <p>{description}</p>
      <p style={{ fontSize: "12px", color: "gray" }}>Specs: {specs}</p>
      <p style={{ fontSize: "12px", color: "gray" }}>Opis: {opis}</p>
    </div>
  );
};

export default AdminProductCard;
