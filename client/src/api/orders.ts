import type { CartItem, Order } from "../types/product";
import { api } from "./api";

export const createOrder = async (items: CartItem[]) => {
  const res = await api.post("/orders", { items });
  return res.data as { id: string };
};

export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data as Order[];
};

export const completeOrder = async (id: string) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data as { deleted: boolean };
};
