import { unsafeQuery } from '../../db/connection';

export function login(username: string, password: string) {
  const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  return unsafeQuery(sql);
}
