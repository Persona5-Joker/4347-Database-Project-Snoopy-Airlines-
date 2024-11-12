export interface CreateReservationRequest {
  outboundFlightId: string;
  returnFlightId?: string;
  passengers: Passenger[];
}

export interface Passenger {
  firstName: string;
  lastName: string;
  dob: string;
  baggageWeights: number[];
}
