import { useNavigate, useSearchParams } from "react-router-dom";
import s from "./SuccessPage.module.css"; 

export const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const status = searchParams.get("redirect_status");

  return (
    <div className={s.container}>
      <div className={s.card}>
        {status === "succeeded" ? (
          <>
            <h1 className={s.title}>Success! 🎉</h1>
            <h2 className={s.subtitle}>Thank you for your order.</h2>
            <p className={s.text}>
              Payment was successful. We are already preparing your items for shipment.
            </p>
          </>
        ) : (
          <>
            <h1 className={s.errorTitle}>Something went wrong </h1>
            <p className={s.text}>
              We couldn't process your payment. Please try again.
            </p>
          </>
        )}
        
        <button className={s.button} onClick={() => navigate("/")}>
          Return to Store
        </button>
      </div>
    </div>
  );
};