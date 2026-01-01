import { db } from "./connection";

// テーブル作成
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user'
  )
`);

// 初期データ
db.exec(`
  INSERT OR IGNORE INTO users (username, password, role) VALUES
  ('admin', 'adminpass', 'admin'),
  ('alice', 'password123', 'user'),
  ('bob', 'bobpass', 'user')
`);

console.log("Database seeded successfully");
