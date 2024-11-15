"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingPassenger } from "@/lib/types";
import { useState } from "react";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) {
      throw new Error("Something went wrong with the request");
    }
    return r.json();
  });

function PassengerUpdateCard({ passenger }: { passenger: BookingPassenger }) {
  const [firstName, setFirstName] = useState(passenger.firstName);
  const [lastName, setLastName] = useState(passenger.lastName);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateName = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/passenger/${passenger.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update passenger name. Please try again.");
      }

      alert("Passenger name updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating passenger name:", error);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>
          {passenger.firstName} {passenger.lastName} (
          <span>{passenger.totalBaggage}x Baggage</span>)
        </CardTitle>
        <CardDescription>
          DOB: {new Date(passenger.dob).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="New First Name"
              className="w-full p-2 border border-gray-300 rounded"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="New Last Name"
              className="w-full p-2 border border-gray-300 rounded"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button
              className="w-full bg-blue-600 text-white py-3"
              onClick={handleUpdateName}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              className="w-full bg-gray-600 text-white py-3"
              onClick={() => setIsEditing(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            className="w-full bg-blue-600 text-white py-3"
            onClick={() => setIsEditing(true)}
          >
            Edit Name
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function ManageTripPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingReference = searchParams.get("bookingReference");

  const {
    data: booking,
    error,
    mutate,
  } = useSWR(
    bookingReference ? `/api/reservation/booking/${bookingReference}` : null,
    fetcher
  );

  const handleCancelReservation = () => {
    fetch(`/api/reservation/${booking.flightDetails.reservationId}`, {
      method: "DELETE",
    })
      .then(() => router.push("/"))
      .catch((error) => console.error("Error canceling reservation:", error));
  };

  const handleCheckIn = () => {
    fetch(`/api/reservation/${booking.flightDetails.reservationId}/check-in`, {
      method: "PUT",
    })
      .then(() => alert("Successfully checked in!"))
      .catch((error) => console.error("Error checking in:", error));
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen my-8">
        <Card className="min-h-[300px] w-[600px] p-6">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Oops!</CardTitle>
            <CardDescription className="text-center text-gray-600">
              We couldn&apos;t load your booking details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="font-semibold text-lg">
              There was an error retrieving the information for this booking.
            </p>
            <p>
              Please try again later, or return to the homepage to start over.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              className="text-white w-full"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

 // Loading screen with a custom spinner and message
 if (!booking)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center flex flex-row justify-center">
        <p className="mt-4 text-xl text-gray-500">Loading Snoopy Airlines information...</p>
      </div>
    </div>
  );

// Error screen with a friendly message and retry button
if (error)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6">
      <h2 className="text-3xl font-bold text-red-600">Oops! Something went wrong</h2>
      <p className="text-xl text-gray-600 mt-4">
        We could not load the page. Please try again later.
      </p>
      <Button
        className="mt-6"
        onClick={() => window.location.reload()}
      >
        Retry
      </Button>
    </div>
  );

  // Check if the booking's flight is in the past
  const isBookingPast =
    new Date(booking.flightDetails.departureTime) < new Date();

  return (
    <div className="flex justify-center items-center min-h-screen my-8">
      <div className="w-full max-w-3xl space-y-8 p-6">
        <h1 className="text-4xl font-bold text-center">Manage Your Trip</h1>
        <p className="text-center text-lg text-gray-600">
          Review and manage your flight details, passenger information, and
          options for check-in.
        </p>

        {/* Booking Status Card */}
        {isBookingPast && (
          <div className="my-4 bg-yellow-100 border-yellow-500 p-4">
            <p className="text-center text-yellow-700 font-semibold">
              This flight has already passed.
            </p>
          </div>
        )}

        {/* Booking Status Card */}
        {!isBookingPast && !booking.flightDetails.isCheckedIn &&  (
          <div className="my-4 bg-green-100 border-green-500 p-4">
            <p className="text-center text-green-700 font-semibold">
              Check-In ahead of time by clicking the button below!
            </p>
          </div>
        )}

        {/* Flight Details */}
        <Card>
          <CardHeader>
            <CardTitle>Flight Information</CardTitle>
            <CardDescription>
              Booking Reference: {bookingReference}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>Flight:</strong> {booking.flightDetails.flightNumber} from{" "}
              {booking.flightDetails.origin} to{" "}
              {booking.flightDetails.destination}
            </div>
            <div>
              <strong>Departure:</strong>{" "}
              {new Date(booking.flightDetails.departureTime).toLocaleString()}
            </div>
            <div>
              <strong>Arrival:</strong>{" "}
              {new Date(booking.flightDetails.arrivalTime).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Passenger Details */}
        {booking.passengers.map(
          (passenger: BookingPassenger, index: number) => (
            <PassengerUpdateCard key={index} passenger={passenger} />
          )
        )}

        {/* Trip Management Options */}
        <div className="space-y-4">
          {/* Cancel Reservation */}
          <Button
            className="w-full bg-red-600 text-white py-3"
            onClick={handleCancelReservation}
          >
            Cancel Trip
          </Button>

          {/* Check In */}
          {!booking.flightDetails.isCheckedIn && !isBookingPast &&  (
            <Button
              className="w-full bg-green-600 text-white py-3"
              onClick={handleCheckIn}
            >
              Check In for Flight
            </Button>
          )}

          {/* Return Home */}
          <Button
            className="w-full bg-gray-700 text-white py-3 mt-4"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
