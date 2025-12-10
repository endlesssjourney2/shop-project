import type { ProductCardProps } from "../../types/product";
import s from "./ProductCard.module.css";

type Props = {
  product: ProductCardProps;
  onModalOpen: () => void;
};

const ProductCard = ({ product, onModalOpen }: Props) => {
  const { name, price, specs, photoUrl, } = product;

  return (
    <div className={s.productCard} onClick={onModalOpen}>
      <div className={s.cardContent}>
        <div className={s.imageContainer}>
          <img src={photoUrl} alt={name} className={s.productImage} />
        </div>
        <h3 className={s.productName}>{name}</h3>
        <p className={s.productDescription}>{specs}</p>
      </div>

      <div className={s.priceAndButtonContainer}>
        <p className={s.productPrice}>${price}</p>

        <button className={s.buyButton}>To cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
