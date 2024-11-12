import { getPool } from "@/lib/db";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pool = getPool();
  const connection = await pool.getConnection();
  const searchParams = request.nextUrl.searchParams;

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departure = searchParams.get("departure");
  const returnDate = searchParams.get("return");

  const [outboundFlights] = await connection.query(
    `
    SELECT * FROM Flight
    INNER JOIN Aircraft on Flight.Aircraft_ID = Aircraft.Aircraft_ID
    WHERE Origin = ? 
      AND Destination = ? 
      AND DATE(Departure) = ?
    `,
    [origin, destination, departure]
  );

  if (returnDate) {
    const [returnFlights] = await connection.query(
      `
    SELECT * FROM Flight
    INNER JOIN Aircraft on Flight.Aircraft_ID = Aircraft.Aircraft_ID
    WHERE Origin = ? 
      AND Destination = ? 
      AND DATE(Departure) = ?
    `,
      [destination, origin, returnDate]
    );

    connection.release();
    return Response.json({ outboundFlights, returnFlights });
  } else {
    return Response.json({ outboundFlights });
  }
}
