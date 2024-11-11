"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PassengerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const passengerCount = parseInt(searchParams.get("passengers") || "1", 10);
  const [passengers, setPassengers] = useState<
    {
      firstName: string;
      lastName: string;
      dob: string;
      baggageCount: number;
    }[]
  >(
    Array.from({ length: passengerCount }, () => ({
      firstName: "",
      lastName: "",
      dob: "",
      baggageCount: 0,
    }))
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: e.target.value,
    };
    setPassengers(updatedPassengers);
  };

  const onSubmit = async () => {
    const allValid = passengers.every(
      (passenger) => passenger.firstName && passenger.lastName && passenger.dob
    );

    if (!allValid) {
      alert("Please fill in all required fields for each passenger.");
      return;
    }

    try {
      router.push("/flights/confirmation");
    } catch (error) {
      console.error(error);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <Card className="min-h-[400px] max-h-[600px] w-[800px] overflow-y-auto">
        <CardHeader className="relative">
          <CardTitle className="z-10">Passenger Information</CardTitle>
          <CardDescription className="z-10">
            Please fill in the details for {passengerCount} passenger(s).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {passengers.map((_, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-extrabold text-lg">Passenger {index + 1}</h3>

              <div className="space-y-2">
                <label>First Name</label>
                <Input
                  type="text"
                  value={passengers[index].firstName}
                  onChange={(e) => handleInputChange(e, index, "firstName")}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter first name"
                />
              </div>

              <div className="space-y-2">
                <label>Last Name</label>
                <Input
                  type="text"
                  value={passengers[index].lastName}
                  onChange={(e) => handleInputChange(e, index, "lastName")}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter last name"
                />
              </div>

              <div className="space-y-2 w-full">
                <label>Date of Birth</label>
                <div className="w-full">
                  <Input
                    type="date"
                    value={passengers[index].dob}
                    onChange={(e) => handleInputChange(e, index, "dob")}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label>Number of Bags</label>
                <Input
                  type="number"
                  value={passengers[index].baggageCount}
                  onChange={(e) => handleInputChange(e, index, "baggageCount")}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter number of bags"
                />
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={onSubmit}>Complete Booking</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
