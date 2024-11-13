"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface SimpleFlightInfoProps {
  flight: {
    Flight_Number: string;
    Model: string;
    Origin: string;
    Destination: string;
  };
  selected?: boolean; // Optional prop to mark the flight as selected
  onClick?: () => void; // Callback to handle click (selecting the flight)
}

export default function SimpleFlightInfo({
  flight,
  onClick,
}: SimpleFlightInfoProps) {
  return (
    <div
      className={`w-full rounded-lg`}
      onClick={onClick} // Trigger the callback when the card is clicked
    >
      <Card className={`border-4`}>
        <CardHeader className="-ml-2">
          <h2 className="text-2xl font-semibold">{flight.Flight_Number}</h2>
          <p className="font-medium text-sm">{flight.Model}</p>
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
        </CardContent>
      </Card>
    </div>
  );
}
