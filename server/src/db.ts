import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const DB_DIR = process.env.DB_DIR || path.resolve(process.cwd(), "data");
const DB_FILE = process.env.DB_FILE || "database.db";
const INIT_SQL =
  process.env.DB_INIT_SQL || path.resolve(process.cwd(), "init.sql");

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const dbPath = path.join(DB_DIR, DB_FILE);
console.log("📦 DB path:", dbPath);
const db = new Database(dbPath) as unknown as import("better-sqlite3").Database;

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
  );
`);

if (fs.existsSync(INIT_SQL)) {
  const sql = fs.readFileSync(INIT_SQL, "utf8");
  db.exec(sql);
}

export default db;
