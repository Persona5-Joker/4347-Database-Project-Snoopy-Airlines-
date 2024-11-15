"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  CreateReservationRequest,
  Passenger,
  ReservationContact,
} from "@/lib/types";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function PassengerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const passengerCount = parseInt(searchParams.get("passengers") || "1", 10);
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: passengerCount }, () => ({
      firstName: "",
      lastName: "",
      dob: "",
      baggageWeights: [],
    }))
  );

  const [reservationContacts, setReservationContacts] = useState<
    ReservationContact[]
  >([{ phone: "", email: "" }]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string,
    bagIndex?: number
  ) => {
    const updatedPassengers = [...passengers];
    if (field === "baggageWeight" && typeof bagIndex === "number") {
      updatedPassengers[index].baggageWeights[bagIndex] =
        parseFloat(e.target.value) || 0;
    } else {
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [field]: e.target.value,
      };
    }
    setPassengers(updatedPassengers);
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof ReservationContact
  ) => {
    const updatedContacts = [...reservationContacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [field]: e.target.value,
    };
    setReservationContacts(updatedContacts);
  };

  const addContact = () => {
    setReservationContacts([...reservationContacts, { phone: "", email: "" }]);
  };

  const removeContact = (index: number) => {
    const updatedContacts = [...reservationContacts];
    if (updatedContacts.length > 1) {
      updatedContacts.splice(index, 1);
      setReservationContacts(updatedContacts);
    } else {
      alert("At least one contact is required.");
    }
  };

  const addBag = (index: number) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index].baggageWeights.push(0);
    setPassengers(updatedPassengers);
  };

  const removeBag = (index: number, bagIndex: number) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index].baggageWeights.splice(bagIndex, 1);
    setPassengers(updatedPassengers);
  };

  const onSubmit = async () => {
    console.log(reservationContacts);
    const allValid = passengers.every(
      (passenger) => passenger.firstName && passenger.lastName && passenger.dob
    );

    if (!allValid) {
      alert("Please fill in all required fields for each passenger.");
      return;
    }

    try {
      const outboundFlightId = searchParams.get("outboundFlight");
      if (!outboundFlightId) {
        alert("Missing outbound flight please return to the main page.");
        return;
      }

      const request: CreateReservationRequest = {
        passengers: passengers,
        outboundFlightId: outboundFlightId,
        returnFlightId: searchParams.get("returningFlight") ?? undefined,
        reservationContacts: reservationContacts,
      };

      const response = await fetch("/api/reservation", {
        method: "POST",
        body: JSON.stringify(request),
      });
      const data = await response.json();

      let params = `?outboundBookingReference=${data.outboundBookingReference}`;
      if (data?.returningBookingReference) {
        params += `&returningBookingReference=${data?.returningBookingReference}`;
      }
      router.push("/flights/confirmation" + params);
    } catch (error) {
      console.error(error);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4 justify-center items-center min-h-screen my-8">
      <Card className="min-h-[300px] max-h-[600px] w-[800px] overflow-y-auto">
        <CardHeader className="relative">
          <CardTitle className="z-10">
            Reservation Contact Information
          </CardTitle>
          <CardDescription className="z-10">
            Please fill in details for Reservation Contacts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 overflow-x-hidden">
          {reservationContacts.map((contact, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-extrabold text-lg">Contact {index + 1}</h3>
              <div className="space-y-2">
                <label>Phone</label>
                <InputOTP
                  pattern={REGEXP_ONLY_DIGITS}
                  maxLength={10}
                  value={contact.phone}
                  onChange={(e) => {
                    handleContactChange(
                      {
                        target: { value: e },
                      } as React.ChangeEvent<HTMLInputElement>,
                      index,
                      "phone"
                    );
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                    <InputOTPSlot index={8} />
                    <InputOTPSlot index={9} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="space-y-2">
                <label>Email</label>
                <Input
                  type="email"
                  value={contact.email}
                  onChange={(e) => handleContactChange(e, index, "email")}
                  placeholder="Enter email address"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <Button
                onClick={() => removeContact(index)}
                className="bg-red-500 text-white"
              >
                Remove Contact
              </Button>
            </div>
          ))}
          <Button onClick={addContact} className="mt-2 bg-blue-500 text-white">
            Add Contact
          </Button>
        </CardContent>
      </Card>

      <Card className="min-h-[400px] w-[800px] overflow-y-auto">
        <CardHeader className="relative">
          <CardTitle className="z-10">Passenger Information</CardTitle>
          <CardDescription className="z-10">
            Please fill in the details for {passengerCount} passenger(s).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {passengers.map((passenger, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-extrabold text-lg">Passenger {index + 1}</h3>

              <div className="space-y-2">
                <label>First Name</label>
                <Input
                  type="text"
                  value={passenger.firstName}
                  onChange={(e) => handleInputChange(e, index, "firstName")}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter first name"
                />
              </div>

              <div className="space-y-2">
                <label>Last Name</label>
                <Input
                  type="text"
                  value={passenger.lastName}
                  onChange={(e) => handleInputChange(e, index, "lastName")}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter last name"
                />
              </div>

              <div className="space-y-2 w-full">
                <label>Date of Birth</label>
                <Input
                  type="date"
                  value={passenger.dob}
                  onChange={(e) => handleInputChange(e, index, "dob")}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-2 flex flex-col">
                <label>Baggages</label>
                {passenger.baggageWeights.map((weight, bagIndex) => (
                  <div key={bagIndex} className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={`${weight}`}
                      onChange={(e) =>
                        handleInputChange(e, index, "baggageWeight", bagIndex)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder={`Bag ${bagIndex + 1} weight`}
                    />
                    <Button
                      onClick={() => removeBag(index, bagIndex)}
                      className="bg-red-500 text-white"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => addBag(index)}
                  className="mt-2 bg-blue-500 text-white"
                >
                  Add Bag
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="w-[400px] bg-transparent">
        <CardContent className="flex justify-center items-center py-2">
          <Button className="w-full" onClick={onSubmit}>
            Submit Reservation
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
