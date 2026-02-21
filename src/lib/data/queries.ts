"use cache";

import { cacheTag } from "next/cache";
import { readDB } from "./store";

async function simulateLatency(ms = 3000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getSales() {
  cacheTag("sales");

  console.log("[CACHE MISS] getSales -- waiting 3s...");
  await simulateLatency();

  const db = await readDB();
  return db.sales;
}

export async function getSalesMyVersion() {
  cacheTag("sales");

  console.log("[CACHE MISS] getSales -- waiting 3s...");
  await simulateLatency();

  const db = await readDB();
  return db.sales;
}

export async function getProducts() {
  cacheTag("products");

  console.log("[CACHE MISS] getProducts -- waiting 3s...");
  await simulateLatency();

  const db = await readDB();
  return db.products;
}

export async function getConfig() {
  cacheTag("config");

  console.log("[CACHE MISS] getConfig -- waiting 3s...");
  await simulateLatency();

  const db = await readDB();
  return db.config;
}
