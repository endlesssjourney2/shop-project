import type { ProductCardProps } from "../../types/product";
import s from "./ProductCard.module.css";

type Props = ProductCardProps & {
  onBuyClick: () => void;
};

const ProductCard = ({
  name,
  price,
  category,
  description,
  photoUrl,
  onBuyClick,
}: Props) => {
  return (
    <div className={s.productCard}>
      <div className={s.imageContainer}>
        <img src={photoUrl} alt={name} className={s.productImage} />
      </div>

      <h3 className={s.productName}>{name}</h3>
      <p className={s.productCategory}>{category}</p>
      <p className={s.productDescription}>{description}</p>
      <p className={s.productPrice}>${price}</p>

      <button className={s.buyButton} onClick={onBuyClick}>
        Kupić
      </button>
    </div>
  );
};

export default ProductCard;
