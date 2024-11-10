"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import Flight, { FlightCardProps } from "@/components/flights/Flight";

//@ts-expect-error not a big deal here
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const searchParams = useSearchParams();
  const { data, error, isLoading } = useSWR(
    `/api/flight/search?${searchParams.toString()}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div className="min-h-screen">loading...</div>;

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <Card className="min-h-[400px] w-[800px]">
        <CardHeader className="relative">
          <CardTitle className="z-10">Available Flights Based on Your Search</CardTitle>
          <CardDescription className="z-10">
            Here are the available outbound flights based on your search
            criteria. Whether you're looking for a specific destination, travel
            dates, or flight preferences, browse through the options below to
            find the perfect flight for your upcoming trip!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.outboundFlights.map((flight: FlightCardProps["flight"]) => {
            return <Flight key={flight.Flight_ID} flight={flight} />;
          })}
        </CardContent>
      </Card>
    </div>
  );
}
