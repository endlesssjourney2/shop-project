import { useCart } from "../../context/CartContext"; 
import { PaymentPage } from "../../components/PaymentForm/PaymentForm"; 
import { useNavigate } from "react-router-dom";
import s from "./CheckoutPage.module.css";

export const CheckoutPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className={s.container}>
        <div className={`${s.card} ${s.emptyContainer}`}>
          <h2 className={s.emptyTitle}>Your cart is empty</h2>
          <button className={s.button} onClick={() => navigate("/")}>
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <div className={s.card}>
        <h1 className={s.title}>Checkout</h1>
        
        <div className={s.orderSummary}>
          <h3 className={s.summaryTitle}>Order Summary:</h3>
          
          {cartItems.map((item) => (
            <div key={item.id} className={s.itemRow}>
              <span className={s.itemName}>
                {item.name} <span style={{color: "#888"}}>x {item.quantity}</span>
              </span>
              <span>{(item.price * item.quantity).toFixed(2)} USD</span>
            </div>
          ))}

          <div className={s.totalRow}>
            <span>Total:</span>
            <span style={{ color: "#2e7d32" }}>{totalAmount.toFixed(2)} USD</span>
          </div>
        </div>

        <PaymentPage amount={totalAmount} />
      </div>
    </div>
  );
};