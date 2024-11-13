import { getPool } from "@/lib/db";
import type { NextRequest } from "next/server";

// Predefined view name mappings
const modelViewMap = {
  Boeing: "Boeing_Flights",
  Airbus: "Airbus_Flights",
  Embraer: "Embraer_Flights",
  Cessna: "Cessna_Flights",
  Bombardier: "Bombardier_Flights",
  "McDonnell Douglas": "McDonnell_Douglas_Flights",
} as const;

export async function GET(
  request: NextRequest,
  { params }: { params: { company: string } }
) {
  const pool = getPool();
  const connection = await pool.getConnection();
  const company = (await params).company;

  if (company && company in modelViewMap) {
    const viewName = modelViewMap[company as keyof typeof modelViewMap];

    try {
      // Safely query using the predefined view name
      const query = `
        SELECT *
        FROM ${viewName}
      `;

      const [flights] = await connection.query(query);

      connection.release();
      return Response.json({ flights });
    } catch (error) {
      connection.release();
      console.error(error);
      // Return a 500 error with a clear message
      return Response.json(
        null,
        { status: 500 }
      );
    }
  } else {
    connection.release();
    return Response.json(
      null,
      { status: 500 }
    );
  }
}
