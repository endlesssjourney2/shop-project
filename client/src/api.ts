import axios from "axios";

const fromEnv = (import.meta.env.VITE_API_URL as string | undefined)?.replace(
  /\/+$/,
  ""
);
const FALLBACK = "https://shop-project-l4ok.onrender.com";
const BASE = (fromEnv || FALLBACK).replace(/\/+$/, "");

export const api = axios.create({
  baseURL: `${BASE}/api`,
});
