import { getPool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET() {
  const pool = getPool();
  const connection = await pool.getConnection();

  const [results] = await connection.query(
    `
    SELECT DISTINCT Model FROM Aircraft
    `
  );

  const companies: { [key: string]: boolean } = (results as RowDataPacket[]).reduce((prev, curr) => {
    const company = curr.Model.replace(/\s+\S+$/g, ''); // This removes the last word, which might be a number or model identifier
    prev[company] = true;

    return prev;
  }, {} as { [key: string]: boolean });

  connection.release();
  return Response.json(Object.keys(companies));
}
