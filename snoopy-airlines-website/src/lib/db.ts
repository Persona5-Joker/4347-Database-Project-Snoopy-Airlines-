import mysql from "mysql2/promise";

// Create the connection pool. The pool-specific settings are the defaults
function createPool() {
  return mysql.createPool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: (process.env.DB_PORT as unknown as number) ?? 3306,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
}

let pool: mysql.Pool;
export function getPool() {
  if (!pool) {
    pool = createPool();
  }
  return pool;
}
