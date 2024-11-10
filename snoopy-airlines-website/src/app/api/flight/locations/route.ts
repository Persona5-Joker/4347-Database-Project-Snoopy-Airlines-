import { getPool } from "@/lib/db";

export async function GET() {
  const pool = getPool();

 // Outbound flight query
 const [origins] = await pool.query(
    `
    SELECT DISTINCT Origin
    FROM Flight;
    `,
  );

  const [destinations] = await pool.query(
    `
    SELECT DISTINCT Destination
    FROM Flight;
    `
  )

  return Response.json({origins, destinations});
}
