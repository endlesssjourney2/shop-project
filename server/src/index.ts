import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);
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
