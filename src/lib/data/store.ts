import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DB_PATH = path.join(process.cwd(), "src/lib/data/db.json");

export type Sale = {
  id: string;
  client: string;
  date: string;
  total: number;
};

export type Product = {
  name: string;
  sku: string;
  quantity: number;
  price: number;
};

export type Config = {
  storeName: string;
  currency: string;
  timezone: string;
};

export type DB = {
  sales: Sale[];
  products: Product[];
  config: Config;
};

export async function readDB(): Promise<DB> {
  const raw = await readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function writeDB(db: DB): Promise<void> {
  await writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}
