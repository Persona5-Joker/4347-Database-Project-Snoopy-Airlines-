import { getPool } from "@/lib/db";
import { BookingFlightDetails, BookingPassenger, BookingSummary } from "@/lib/types";
import { RowDataPacket } from "mysql2";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ booking: string }> }
) {
  const pool = getPool();
  const connection = await pool.getConnection();
  const bookingReference = (await params).booking;

  let [results] = await connection.execute(
    `SELECT
          Passenger.First_Name,
          Passenger.Last_Name,
          Passenger.Date_Of_Birth,
          Reservation.Reservation_ID,
          Reservation.Booking_Reference_Number,
          Reservation.Is_Checked_In,
          Flight.*,
          COUNT(Baggage.Baggage_ID) AS Total_Baggage,
          SUM(Baggage.Weight) AS Total_Baggage_Weight
      FROM
          Reservation
              INNER JOIN Flight ON Reservation.Flight_ID = Flight.Flight_ID
              LEFT JOIN Passenger_Reservation ON Passenger_Reservation.Reservation_ID = Reservation.Reservation_ID
              LEFT JOIN Passenger ON Passenger.Passenger_ID = Passenger_Reservation.Passenger_ID
              LEFT JOIN Baggage ON Baggage.Passenger_Reservation_ID = Passenger_Reservation.Passenger_Reservation_ID
      WHERE
          Reservation.Booking_Reference_Number = ?
      GROUP BY 
          Passenger.Passenger_ID,
          Reservation.Reservation_ID,
          Flight.Flight_ID;`,
          [bookingReference]
  );

  connection.release();
  
  results = results as RowDataPacket[];
  if (results.length == 0) {
    return Response.json(null)
  }

  // Extract flight details from the first record (assuming they are the same across all rows)
  const flightDetails: BookingFlightDetails = {
    flightID: results[0].Flight_ID,
    flightNumber: results[0].Flight_Number,
    aircraftID: results[0].Aircraft_ID,
    departureTime: results[0].Departure,
    arrivalTime: results[0].Arrival,
    origin: results[0].Origin,
    destination: results[0].Destination,
    bookingReferenceNumber: results[0].Booking_Reference_Number,
    reservationId: results[0].Reservation_ID,
    isCheckedIn: results[0].Is_Checked_In
  };

  // Format passengers with baggage info
  const passengers: BookingPassenger[] = (results as RowDataPacket[]).map(row => ({
    firstName: row.First_Name,
    lastName: row.Last_Name,
    dob: row.Date_Of_Birth,
    totalBaggage: row.Total_Baggage,
    totalBaggageWeight: row.Total_Baggage_Weight
  }));


  // Final structured response
  const response: BookingSummary = {
    flightDetails,
    passengers
  };

  return Response.json(response)
}