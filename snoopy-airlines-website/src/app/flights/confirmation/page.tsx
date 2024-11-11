"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("bookingId");
  const flightDetails = JSON.parse(searchParams.get("flightDetails") || "{}");

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Booking Confirmation</h1>
        <p className="mt-4">
          Thank you for booking with us! Your booking details are as follows:
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <span className="font-medium">Booking ID:</span> {bookingId}
          </div>
          <div>
            <span className="font-medium">Flight:</span>{" "}
            {flightDetails.flightNumber} from {flightDetails.departureCity} to{" "}
            {flightDetails.arrivalCity}
          </div>
          <div>
            <span className="font-medium">Departure Time:</span>{" "}
            {new Date(flightDetails.departureTime).toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Passenger Details:</span>
            <ul className="mt-2 space-y-2">
              {flightDetails.passengers.map(
                (
                  passenger: {
                    firstName: string;
                    lastName: string;
                    dob: string;
                    baggageCount: number;
                  },
                  index: number
                ) => (
                  <li key={index}>
                    {passenger.firstName} {passenger.lastName} (DOB:{" "}
                    {new Date(passenger.dob).toLocaleDateString()})
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md"
          onClick={() => router.push("/")}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
