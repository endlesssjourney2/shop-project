import { Drawer, IconButton } from "@mui/material";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import s from "./Cart.module.css";
import CheckoutButton from "../CheckoutButton/CheckoutButton";

const Cart = () => {
  const {
    isCartOpen,
    toggleCart,
    cartItems,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalSum = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
      <div className={s.cartDrawer}>
        <div className={s.cartHeader}>
          <h2>Your shopping cart</h2>
          <IconButton onClick={toggleCart}>
            <X />
          </IconButton>
        </div>
        <div className={s.cartItemsList}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={s.cartItem}>
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  className={s.cartItemImage}
                />
                <div className={s.cartItemDetails}>
                  <p>{item.name}</p>
                  <p>${item.price * item.quantity}</p>
                </div>

                <div className={s.quantityControls}>
                  <button
                    className={s.quantityButton}
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className={s.quantityDisplay}>{item.quantity}</span>
                  <button
                    className={s.quantityButton}
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={s.cartFooter}>
            <div className={s.totalSum}>
              <span>In total:</span>
              <span>${totalSum.toFixed(2)}</span>
            </div>
            <CheckoutButton />
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default Cart;
