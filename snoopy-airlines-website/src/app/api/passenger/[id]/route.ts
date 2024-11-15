import { getPool } from "@/lib/db";
import {
  BookingFlightDetails,
  BookingPassenger,
  BookingSummary,
} from "@/lib/types";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import type { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const pool = getPool();
  const connection = await pool.getConnection();
  const passengerId = (await params).id;
  const { firstName, lastName } = await request.json();

  const [result] = await connection.execute(
    "UPDATE Passenger SET First_Name = ?, Last_Name = ? WHERE Passenger.Passenger_ID = ?",
    [firstName, lastName, passengerId]
  );

  if ((result as ResultSetHeader)?.affectedRows == 0) {
    await connection.rollback();
    return Response.json(null, {status: 500});
  }

  await connection.commit();
  connection.release();
  return Response.json("Success!");
}
