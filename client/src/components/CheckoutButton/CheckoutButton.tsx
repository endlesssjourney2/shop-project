import { type FC } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orders";
import s from "./CheckoutButton.module.css";

const CheckoutButton: FC = () => {
  const { cartItems, clearCart } = useCart();

  const handleClick = async () => {
    if (cartItems.length === 0) return alert("Cart is empty");

    try {
      const { id } = await createOrder(cartItems);
      console.log(`Order created!  N ${id}`);
      clearCart();
    } catch (error) {
      console.error(`Error during complete order ${error}`);
    }
  };

  return (
    <>
      <button onClick={handleClick} className={s.btn}>
        Create order
      </button>
    </>
  );
};

export default CheckoutButton;
