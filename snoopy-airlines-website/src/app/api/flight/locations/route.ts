import { getPool } from "@/lib/db";

export async function GET() {
  const pool = getPool();
  const connection = await pool.getConnection();

 // Outbound flight query
 const [origins] = await connection.query(
    `
    SELECT DISTINCT Origin
    FROM Flight;
    `,
  );

  const [destinations] = await connection.query(
    `
    SELECT DISTINCT Destination
    FROM Flight;
    `
  )

  connection.release();
  return Response.json({origins, destinations});
}
