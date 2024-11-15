import { getPool } from "@/lib/db";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ company: string }> }
) {
  const pool = getPool();
  const connection = await pool.getConnection();
  const company = (await params).company;

  try {
    // Safely query using the predefined view name
    const query = `
        SELECT * FROM Aircraft
        WHERE Aircraft.Model LIKE ?
      `;

    const [models] = await connection.query(query, [company + "%"]);

    connection.release();
    return Response.json({ models });
  } catch (error) {
    connection.release();
    console.error(error);
    // Return a 500 error with a clear message
    return Response.json(null, { status: 500 });
  }
}
