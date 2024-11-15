import { getPool } from "@/lib/db";
import { CreateReservationRequest } from "@/lib/types";
import { ResultSetHeader } from "mysql2";

export async function POST(req: Request) {
  const pool = getPool();
  const connection = await pool.getConnection();

  const {
    outboundFlightId,
    returnFlightId,
    passengers,
    reservationContacts,
  }: CreateReservationRequest = await req.json();

  let returningReservationResult;
  let outboundBookingReference;
  let returningBookingReference;

  try {
    await connection.beginTransaction();

    // Step 1: Create outbound reservation
    let randomNumber = Math.floor(100000 + Math.random() * 900000);
    outboundBookingReference = `BR${randomNumber}`
    const [outboundReservationResult] = await connection.execute(
      `
      INSERT INTO Reservation(Booking_Reference_Number, Flight_ID, Is_Checked_In, Reservation_Date)
      VALUES(?, ?, ?, ?);
      `,
      [outboundBookingReference, outboundFlightId, false, new Date()]
    );

    if (returnFlightId) {
      randomNumber = Math.floor(100000 + Math.random() * 900000);
      returningBookingReference = `BR${randomNumber}`;
      const [result] = await connection.execute(
        `
        INSERT INTO Reservation(Booking_Reference_Number, Flight_ID, Is_Checked_In, Reservation_Date)
        VALUES(?, ?, ?, ?);
        `,
        [returningBookingReference, returnFlightId, false, new Date()]
      );

      returningReservationResult = result;
    }

    // Step 2: Create Passengers
    const passengerIds = [];
    for (const passenger of passengers) {
      const [result] = await connection.execute(
        `
          INSERT INTO Passenger(First_Name, Last_Name, Date_of_Birth)
          VALUES(?, ?, ?);
          `,
        [passenger.firstName, passenger.lastName, passenger.dob]
      );

      passengerIds.push((result as ResultSetHeader)?.insertId);
    }

    // Step 3: Create Passenger Reservation
    const outboundPassengerReservationIds = [];
    const returningPassengerReservationIds = [];
    for (const passengerId of passengerIds) {
      const [result] = await connection.execute(
        `
          INSERT INTO Passenger_reservation(Passenger_ID, Reservation_ID)
          VALUES(?, ?);
          `,
        [passengerId, (outboundReservationResult as ResultSetHeader)?.insertId]
      );

      outboundPassengerReservationIds.push(
        (result as ResultSetHeader)?.insertId
      );

      if (returningReservationResult) {
        const [result] = await connection.execute(
          `
              INSERT INTO Passenger_reservation(Passenger_ID, Reservation_ID)
              VALUES(?, ?);
              `,
          [
            passengerId,
            (returningReservationResult as ResultSetHeader)?.insertId,
          ]
        );

        returningPassengerReservationIds.push(
          (result as ResultSetHeader)?.insertId
        );
      }
    }

    // Step 4: Tie the baggage to each passenger reservation.
    for (let i = 0; i < passengers.length; i++) {
      const baggages = passengers[i].baggageWeights;

      for (let j = 0; j < baggages.length; j++) {
        await connection.execute(
          `
          INSERT INTO Baggage (Passenger_Reservation_ID, Weight) VALUES
          (?, ?);
          `,
          [outboundPassengerReservationIds[i], baggages[j]]
        );

        if (returningReservationResult) {
          await connection.execute(
            `
              INSERT INTO Baggage (Passenger_Reservation_ID, Weight) VALUES
              (?, ?);
              `,
            [returningPassengerReservationIds[i], baggages[j]]
          );
        }
      }
    }

    // Step 5: Create reservation contact for each reservation
    for (const contact of reservationContacts) {
      const formattedPhone = contact.phone.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "$1-$2-$3"
      );

      await connection.execute(
        `
            INSERT INTO Reservation_Contact (Reservation_ID, Email, Phone) 
            VALUES 
            (?, ?, ?);
              `,
        [
          (outboundReservationResult as ResultSetHeader)?.insertId,
          contact.email,
          formattedPhone,
        ]
      );

      if (returningReservationResult) {
        await connection.execute(
          `
                INSERT INTO Reservation_Contact (Reservation_ID, Email, Phone) 
                VALUES 
                (?, ?, ?);
                  `,
          [
            (returningReservationResult as ResultSetHeader)?.insertId,
            contact.email,
            formattedPhone,
          ]
        );
      }
    }

    await connection.commit();
    return new Response(
      JSON.stringify({
        status: "success",
        outboundBookingReference,
        returningBookingReference,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
