import express from "express";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";

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

app.use(cors(corsOptions));
app.options("/api/(.*)", cors(corsOptions));

app.use(express.json());

app.use("/api", router);

app.get("/healthz", (_, res) => res.send("ok"));

app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(500).json({ error: err?.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API on :${PORT}`);
});
