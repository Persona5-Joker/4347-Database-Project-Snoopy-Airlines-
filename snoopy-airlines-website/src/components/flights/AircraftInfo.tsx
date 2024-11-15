"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface SimpleAircraftInfo {
  aircraft: {
    Model: string;
    Has_Wifi?: number;
    Has_Power_Outlets?: number;
    Number_Of_Seats?: number;
  };
  selected?: boolean; // Optional prop to mark the aircraft as selected
  onClick?: () => void; // Callback to handle click (selecting the aircraft)
}

export default function AircraftInfo({
  aircraft,
  onClick,
}: SimpleAircraftInfo) {
  return (
    <div
      className="w-full rounded-lg"
      onClick={onClick} // Trigger the callback when the card is clicked
    >
      <Card className="border-4">
        <CardHeader className="-ml-2">
          <h2 className="font-bold">{aircraft.Model}</h2>
        </CardHeader>
        <CardContent className="px-4 py-3">
          <div className="text-sm text-gray-600">
            <p>
              <span className="font-bold">Wifi:</span>{" "}
              {aircraft.Has_Wifi ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-bold">Power Outlets:</span>{" "}
              {aircraft.Has_Power_Outlets ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-bold">Seats:</span>{" "}
              {aircraft.Number_Of_Seats ?? "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
