"use server";

import { updateTag } from "next/cache";
import { readDB, writeDB } from "../data/store";
import type { Config, Sale } from "../data/store";

export async function createSale(data: Omit<Sale, "id">) {
  const db = await readDB();
  const nextNum = db.sales.length + 1;
  const newSale: Sale = {
    id: `V-${String(nextNum).padStart(3, "0")}`,
    ...data,
  };
  db.sales.push(newSale);
  await writeDB(db);

  updateTag("sales");
}

export async function createProduct(data: {
  name: string;
  sku: string;
  quantity: number;
  price: number;
}) {
  const db = await readDB();
  db.products.push(data);
  await writeDB(db);

  updateTag("products");
}

export async function updateConfig(data: Partial<Config>) {
  const db = await readDB();
  db.config = { ...db.config, ...data };
  await writeDB(db);

  updateTag("config");
}
