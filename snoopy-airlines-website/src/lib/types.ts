export interface CreateReservationRequest {
  outboundFlightId: string;
  returnFlightId?: string;
  passengers: Passenger[];
  reservationContacts: ReservationContact[];
}

export interface Passenger {
  firstName: string;
  lastName: string;
  dob: string;
  baggageWeights: number[];
}

export interface ReservationContact {
  email: string,
  phone: string,
}

export type BookingFlightDetails = {
  flightID: number;
  flightNumber: string;
  aircraftID: number;
  departureTime: string; // ISO date string
  arrivalTime: string; // ISO date string
  origin: string;
  destination: string;
  bookingReferenceNumber: string;
  reservationId: number;
  isCheckedIn: boolean; // Use boolean to indicate checked-in status
};

export type BookingPassenger = {
  firstName: string;
  lastName: string;
  dob: string; // ISO date string
  totalBaggage: number;
  totalBaggageWeight: number; // Using number to simplify weight operations
};

export type BookingSummary = {
  flightDetails: BookingFlightDetails;
  passengers: BookingPassenger[];
};
