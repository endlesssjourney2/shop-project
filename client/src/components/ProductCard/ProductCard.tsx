import type { ProductCardProps } from "../../types/product";
import s from "./ProductCard.module.css";

type Props = {
  product: ProductCardProps; // 👈 Очікуємо 'product'
  onModalOpen: () => void; // 👈 Очікуємо 'onModalOpen'
};

const ProductCard = ({ product, onModalOpen }: Props) => {
  // 3. Дістаємо функцію 'addToCart' прямо з "мозку"

  // 4. Дістаємо дані з 'product', щоб було чистіше
  const { name, price, specs, photoUrl } = product;

  return (
    // 5. Клік на КАРТКУ відкриває модалку
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
