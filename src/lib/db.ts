import Database from "better-sqlite3";
import path from "path";

const DB_PATH = process.env.VERCEL ? "/tmp/mhih.db" : path.join(process.cwd(), "mhih.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initSchema(db);
  }
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stripe_session_id TEXT UNIQUE NOT NULL,
      customer_email TEXT,
      instagram_handle TEXT,
      total INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL REFERENCES orders(id),
      product_slug TEXT NOT NULL,
      product_name TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      price INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS impact (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL REFERENCES orders(id),
      therapy_sessions_funded INTEGER NOT NULL DEFAULT 1,
      recipient_story TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

export interface OrderRecord {
  stripe_session_id: string;
  customer_email: string;
  instagram_handle: string;
  total: number;
  status: string;
}

export interface OrderItemRecord {
  order_id: number;
  product_slug: string;
  product_name: string;
  quantity: number;
  price: number;
}

export function createOrder(order: OrderRecord): number {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO orders (stripe_session_id, customer_email, instagram_handle, total, status)
    VALUES (@stripe_session_id, @customer_email, @instagram_handle, @total, @status)
  `);
  const result = stmt.run(order);
  return result.lastInsertRowid as number;
}

export function createOrderItems(items: OrderItemRecord[]) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO order_items (order_id, product_slug, product_name, quantity, price)
    VALUES (@order_id, @product_slug, @product_name, @quantity, @price)
  `);
  for (const item of items) {
    stmt.run(item);
  }
}

export function recordImpact(orderId: number, sessionsFunded: number) {
  const db = getDb();
  db.prepare(`
    INSERT INTO impact (order_id, therapy_sessions_funded)
    VALUES (?, ?)
  `).run(orderId, sessionsFunded);
}

export function updateOrderStatus(stripeSessionId: string, status: string) {
  const db = getDb();
  db.prepare(`
    UPDATE orders SET status = ? WHERE stripe_session_id = ?
  `).run(status, stripeSessionId);
}

export function getTotalTherapySessions(): number {
  const db = getDb();
  const row = db.prepare(`
    SELECT COALESCE(SUM(therapy_sessions_funded), 0) as total FROM impact
  `).get() as { total: number };
  return row.total;
}

export function getTotalOrders(): number {
  const db = getDb();
  const row = db.prepare(`
    SELECT COUNT(*) as total FROM orders WHERE status = 'paid'
  `).get() as { total: number };
  return row.total;
}

export interface FullOrder {
  id: number;
  stripe_session_id: string;
  customer_email: string;
  instagram_handle: string;
  total: number;
  status: string;
  created_at: string;
  sessions_funded: number;
  items: string; // JSON array
}

export function getAllOrders(): FullOrder[] {
  const db = getDb();
  return db.prepare(`
    SELECT
      o.id, o.stripe_session_id, o.customer_email, o.instagram_handle,
      o.total, o.status, o.created_at,
      COALESCE(SUM(i.therapy_sessions_funded), 0) as sessions_funded,
      json_group_array(
        json_object('name', oi.product_name, 'qty', oi.quantity, 'price', oi.price)
      ) as items
    FROM orders o
    LEFT JOIN impact i ON i.order_id = o.id
    LEFT JOIN order_items oi ON oi.order_id = o.id
    GROUP BY o.id
    ORDER BY o.created_at DESC
    LIMIT 100
  `).all() as FullOrder[];
}

export function getImpactBreakdown(): { total_sessions: number; total_orders: number; total_revenue: number } {
  const db = getDb();
  const row = db.prepare(`
    SELECT
      COALESCE((SELECT SUM(therapy_sessions_funded) FROM impact), 0) as total_sessions,
      COALESCE((SELECT COUNT(*) FROM orders WHERE status = 'paid'), 0) as total_orders,
      COALESCE((SELECT SUM(total) FROM orders WHERE status = 'paid'), 0) as total_revenue
  `).get() as { total_sessions: number; total_orders: number; total_revenue: number };
  return row;
}
