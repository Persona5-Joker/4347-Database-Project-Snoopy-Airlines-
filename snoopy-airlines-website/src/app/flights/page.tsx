"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import Flight, { FlightCardProps } from "@/components/flights/Flight";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { useState } from "react";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) {
      throw new Error("Something went wrong with the request");
    }
    return r.json();
  });

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("return");

  const { data, error, isLoading } = useSWR(
    `/api/flight/search?${searchParams.toString()}`,
    fetcher
  );

  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<
    number | null
  >(null);
  const [selectedReturningFlight, setSelectedReturningFlight] = useState<
    number | null
  >(null);

  const handleFlightSelect = (
    currentFlightId: number | null,
    flightId: number
  ) => {
    if (flightId === currentFlightId) {
      return null;
    } else {
      return flightId;
    }
  };

  const goBackHome = () => {
    router.replace("/");
  };

  const onSubmit = () => {
    if (!selectedOutboundFlight || (!selectedReturningFlight && returnTo)) {
      alert("Please pick your flight before continuing.");
      return;
    }

    let url = `flights/complete?${searchParams.toString()}&outboundFlight=${selectedOutboundFlight}`;
    if (selectedReturningFlight) {
      url += `&returningFlight=${selectedReturningFlight}`;
    }
    router.push(url);
  };

  // Error screen with a friendly message and retry button
  if (error)
    return (
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

  // Loading screen with a custom spinner and message
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center flex flex-row justify-center">
          <p className="mt-4 text-xl text-gray-500">
            Loading Snoopy Airlines information...
          </p>
        </div>
      </div>
    );

  const outboundFlights = data?.outboundFlights || [];
  const returnFlights = data?.returnFlights || [];
  const showOutboundError = outboundFlights.length == 0 && !returnTo;
  const showReturnError = returnTo && returnFlights.length == 0;

  return (
    <div className="w-full flex justify-center items-center min-h-screen my-8">
      <Card className="min-h-[400px] w-[800px]">
        <CardHeader className="relative">
          <CardTitle className="z-10">
            Available Flights Based on Your Search
          </CardTitle>
          <CardDescription className="z-10">
            {returnTo
              ? "Here are the available outbound and return flights based on your search criteria."
              : "Here are the available outbound flights based on your search criteria."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {showOutboundError && (
            <div className="bg-red-100 text-red-800 border border-red-300 rounded-md p-4">
              <p className="font-semibold">
                Oops! No outbound flights available.
              </p>
              <p>
                We could not find any outbound flights based on your search
                criteria.
              </p>
            </div>
          )}

          {showReturnError && (
            <div className="bg-red-100 text-red-800 border border-red-300 rounded-md p-4">
              <p className="font-semibold">
                Oops! No return flights available.
              </p>
              <p>
                We could not find any return flights based on your search
                criteria.
              </p>
            </div>
          )}

          {!showOutboundError && (
            <>
              <h2 className="font-extrabold text-lg">
                Pick your Outbound Flight
              </h2>
              {outboundFlights.map((flight: FlightCardProps["flight"]) => (
                <Flight
                  key={flight.Flight_ID}
                  flight={flight}
                  selected={selectedOutboundFlight === flight.Flight_ID}
                  onClick={() =>
                    setSelectedOutboundFlight(
                      handleFlightSelect(
                        selectedOutboundFlight,
                        flight.Flight_ID
                      )
                    )
                  }
                />
              ))}
            </>
          )}

          {!showReturnError && returnTo && (
            <>
              <h2 className="font-extrabold text-lg">
                Pick your Returning Flight
              </h2>
              {returnFlights.map((flight: FlightCardProps["flight"]) => (
                <Flight
                  key={flight.Flight_ID}
                  flight={flight}
                  selected={selectedReturningFlight === flight.Flight_ID}
                  onClick={() =>
                    setSelectedReturningFlight(
                      handleFlightSelect(
                        selectedReturningFlight,
                        flight.Flight_ID
                      )
                    )
                  }
                />
              ))}
            </>
          )}

          {/* Back Home Button */}
          {(showOutboundError || showReturnError) && (
            <div className="mt-4">
              <Button onClick={goBackHome} variant="outline" className="w-full">
                Back to Home
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!showOutboundError && !showReturnError && (
            <Button onClick={onSubmit}>Confirm</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
