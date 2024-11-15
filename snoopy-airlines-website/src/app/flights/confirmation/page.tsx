"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingPassenger } from "@/lib/types";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) {
      throw new Error("Something went wrong with the request");
    }
    return r.json();
  });

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const departureBookingId = searchParams.get("outboundBookingReference");
  const returnBookingId = searchParams.get("returningBookingReference");

  // Fetch departure booking details
  const { data: departureBooking, error: departureError } = useSWR(
    departureBookingId
      ? `/api/reservation/booking/${departureBookingId}`
      : null,
    fetcher
  );

  // Fetch return booking details if it exists
  const { data: returnBooking, error: returnError } = useSWR(
    returnBookingId ? `/api/reservation/booking/${returnBookingId}` : null,
    fetcher
  );

  if (departureError || returnError)
    return (
      // Error screen with a friendly message and retry button

      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6">
        <h2 className="text-3xl font-bold text-red-600">
          Oops! Something went wrong
        </h2>
        <p className="text-xl text-gray-600 mt-4">
          We could not load the page. Please try again later.
        </p>
        <Button className="mt-6" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );

  if (!departureBooking)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center flex flex-row justify-center">
          <p className="mt-4 text-xl text-gray-500">
            Loading Snoopy Airlines information...
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen my-8">
      <div className="w-full max-w-3xl space-y-8 p-6">
        <h1 className="text-4xl font-bold text-center">Booking Confirmation</h1>
        <p className="text-center text-lg text-gray-600">
          Thank you for booking with us! Here are your booking details:
        </p>

        {/* Departure Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle>Departure Flight</CardTitle>
            <CardDescription>Booking ID: {departureBookingId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>Flight:</strong>{" "}
              {departureBooking.flightDetails.flightNumber} from{" "}
              {departureBooking.flightDetails.origin} to{" "}
              {departureBooking.flightDetails.destination}
            </div>
            <div>
              <strong>Departure Time:</strong>{" "}
              {new Date(
                departureBooking.flightDetails.departureTime
              ).toLocaleString()}
            </div>
            <div>
              <strong>Arrival Time:</strong>{" "}
              {new Date(
                departureBooking.flightDetails.arrivalTime
              ).toLocaleString()}
            </div>
            <div>
              <strong>Passenger Details:</strong>
            </div>
            <ul className="pl-4 list-disc">
              {departureBooking.passengers.map(
                (passenger: BookingPassenger, index: number) => (
                  <li key={index}>
                    {passenger.firstName} {passenger.lastName} (DOB:{" "}
                    {new Date(passenger.dob).toLocaleDateString()}) (
                    {passenger.totalBaggage}
                    <span>x Baggage</span>)
                  </li>
                )
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Return Booking Details */}
        {returnBooking && (
          <Card>
            <CardHeader>
              <CardTitle>Returning Flight</CardTitle>
              <CardDescription>Booking ID: {returnBookingId}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <strong>Flight:</strong>{" "}
                {returnBooking.flightDetails.flightNumber} from{" "}
                {returnBooking.flightDetails.origin} to{" "}
                {returnBooking.flightDetails.destination}
              </div>
              <div>
                <strong>Departure Time:</strong>{" "}
                {new Date(
                  returnBooking.flightDetails.departureTime
                ).toLocaleString()}
              </div>
              <div>
                <strong>Passenger Details:</strong>
              </div>
              <ul className="pl-4 list-disc">
                {returnBooking.passengers.map(
                  (passenger: BookingPassenger, index: number) => (
                    <li key={index}>
                      {passenger.firstName} {passenger.lastName} (DOB:{" "}
                      {new Date(passenger.dob).toLocaleDateString()}) (
                      {passenger.totalBaggage}
                      <span>x Baggage</span>)
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Return Home Button */}
        <Button
          className="w-full bg-blue-600 text-white py-3 mt-4"
          onClick={() => router.push("/")}
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
}
