"use client";

import * as React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface FlightCardProps {
  flight: {
    Flight_ID: number;
    Flight_Number: string;
    Aircraft_ID: number;
    Departure: string;
    Arrival: string;
    Origin: string;
    Destination: string;
  };
}

export default function Flight({ flight }: FlightCardProps) {
  return (
    <div className="w-full bg-white border rounded-lg shadow-md">
      <Card className="border-t-4 border-blue-500">
        <CardHeader>
          <h2 className="text-2xl font-semibold">{flight.Flight_Number}</h2>
        </CardHeader>
        <CardContent className="space-y-4 px-4 py-3">
          <div className="flex justify-between text-sm text-gray-600">
            <div>
              <p className="font-medium">Origin</p>
              <p>{flight.Origin}</p>
            </div>
            <div>
              <p className="font-medium">Destination</p>
              <p>{flight.Destination}</p>
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <div>
              <p className="font-medium">Departure</p>
              <p>
                {format(new Date(flight.Departure), "MMM dd, yyyy hh:mm a")}
              </p>
            </div>
            <div>
              <p className="font-medium">Arrival</p>
              <p>{format(new Date(flight.Arrival), "MMM dd, yyyy hh:mm a")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
