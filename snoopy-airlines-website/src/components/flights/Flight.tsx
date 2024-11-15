"use client";

import * as React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface FlightCardProps {
  flight: {
    Flight_ID: number;
    Flight_Number: string;
    Aircraft_ID: number;
    Departure: string; // Alternatively, you can use Date if you parse it
    Arrival: string; // Alternatively, you can use Date if you parse it
    Origin: string;
    Destination: string;
    Has_Power_Outlets: number; // Assuming 1 = true, 0 = false
    Has_WiFi: number; // Assuming 1 = true, 0 = false
    Model: string;
    Number_Of_Seats: number;
  };
  selected?: boolean; // Optional prop to mark the flight as selected
  onClick?: () => void; // Callback to handle click (selecting the flight)
}

export default function Flight({
  flight,
  selected = false,
  onClick,
}: FlightCardProps) {
  return (
    <div
      className={`w-full bg-white border rounded-lg shadow-md`}
      onClick={onClick} // Trigger the callback when the card is clicked
    >
      <Card
        className={`border-t-4 ${
          selected ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <CardHeader className="-ml-2">
          <h2 className="text-2xl font-semibold">{flight.Flight_Number}</h2>
          <p className="font-medium text-sm">
            {flight.Model} - {flight.Number_Of_Seats} Seats -{" "}
            {flight.Has_WiFi ? "Has Wifi" : "No Wifi"} -{" "}
            {flight.Has_Power_Outlets
              ? "Has Power Outlets"
              : "No Power Outlets"}
          </p>
        </CardHeader>
        <CardContent className="space-y-4 px-4 py-3">
          <div className="flex justify-between text-sm text-gray-600">
            <div>
              <p className="font-bold">Origin</p>
              <p>{flight.Origin}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">Destination</p>
              <p>{flight.Destination}</p>
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <div>
              <p className="font-bold">Departure</p>
              <p>
                {format(new Date(flight.Departure), "MMM dd, yyyy hh:mm a")}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">Arrival</p>
              <p>{format(new Date(flight.Arrival), "MMM dd, yyyy hh:mm a")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
