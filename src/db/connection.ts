import Database, { Database as DatabaseType } from "better-sqlite3";

const dbPath = process.env.DB_PATH || "./data/vulnlab.db";
export const db: DatabaseType = new Database(dbPath);

// 脆弱なクエリ（文字列結合）
export function unsafeQuery(sql: string) {
  return db.prepare(sql).all();
}

// 安全なクエリ（プレースホルダ）
// sql自体が外部入力から渡る場合には、依然としてSQLインジェクションの危険がある
export function safeQuery(sql: string, params: unknown[]) {
  return db.prepare(sql).all(...params);
}
