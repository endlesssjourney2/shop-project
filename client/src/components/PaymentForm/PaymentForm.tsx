import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import s from "./PaymentForm.module.css"; 

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

  const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.hostname.includes("localhost")
          ? window.location.origin + "/success"
          : "https://endlesssjourney2.github.io/shop-project/success", 
      },
    });

    if (error) {
      setMessage(error.message || "An error occurred during payment.");
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <PaymentElement />
      
      <button 
        disabled={isProcessing || !stripe || !elements} 
        className={s.button}
      >
        {isProcessing ? "Processing..." : `Pay $${amount}`}
      </button>

      {message && <div className={s.errorMessage}>{message}</div>}
    </form>
  );
};

export const PaymentPage = ({ amount }: { amount: number }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}/api/payments/create-intent`, {
      amount: amount, 
      currency: "usd"
    })
    .then((res) => setClientSecret(res.data.clientSecret))
    .catch((err) => console.error(err));
  }, [amount]);

  if (!clientSecret) {
    return <div className={s.loading}>Loading payment system...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};