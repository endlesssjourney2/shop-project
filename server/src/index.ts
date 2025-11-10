import express from "express";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();

const ALLOWED = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const useCredentials = ALLOWED.length > 0;

const corsOptions: cors.CorsOptions = {
  origin: useCredentials ? ALLOWED : true,
  credentials: useCredentials,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());

app.use("/api", cors(corsOptions), router);

app.use("/api", router);

app.get("/healthz", (_, res) => res.send("ok"));

app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(500).json({ error: err?.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`API on :${PORT}`);
  });
}

export default app;
