import { getPool } from "@/lib/db";
import { CreateReservationRequest } from "@/lib/types";
import { ResultSetHeader } from "mysql2";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const pool = getPool();
  const connection = await pool.getConnection();
  const reservationId = (await params).id;

  try {
    await connection.beginTransaction();

    await connection.execute(
      "DELETE FROM Reservation WHERE Reservation.Reservation_ID = ?;",
      [reservationId]
    );

    await connection.commit();
    return new Response("Success!", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
