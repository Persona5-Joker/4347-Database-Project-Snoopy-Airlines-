USE SNOOPY_AIRLINES_3NF;

CREATE VIEW Passenger_Reservation_Summary AS
SELECT 
    Passenger.Passenger_ID,
    Passenger.First_Name,
    Passenger.Last_Name,
    Passenger.Date_Of_Birth,
    Reservation.Reservation_ID,
    Reservation.Booking_Reference_Number,
    Reservation.Is_Checked_In,
    Flight.*,
    COUNT(Baggage.Baggage_ID) AS Total_Baggage,
    SUM(Baggage.Weight) AS Total_Baggage_Weight
FROM
    Reservation
        INNER JOIN Flight ON Reservation.Flight_ID = Flight.Flight_ID
        LEFT JOIN Passenger_Reservation ON Passenger_Reservation.Reservation_ID = Reservation.Reservation_ID
        LEFT JOIN Passenger ON Passenger.Passenger_ID = Passenger_Reservation.Passenger_ID
        LEFT JOIN Baggage ON Baggage.Passenger_Reservation_ID = Passenger_Reservation.Passenger_Reservation_ID
GROUP BY 
    Passenger.Passenger_ID,
    Reservation.Reservation_ID,
    Flight.Flight_ID;



CREATE VIEW Boeing_Flights AS
SELECT Flight.Flight_Number, Aircraft.Model, Flight.Origin, Flight.Destination FROM
Aircraft JOIN Flight ON Aircraft.Aircraft_ID = Flight.Aircraft_ID
WHERE Aircraft.Model LIKE 'Boeing%';

CREATE VIEW Airbus_Flights AS
SELECT Flight.Flight_Number, Aircraft.Model, Flight.Origin, Flight.Destination FROM
Aircraft JOIN Flight ON Aircraft.Aircraft_ID = Flight.Aircraft_ID
WHERE Aircraft.Model LIKE 'Airbus%';

CREATE VIEW Embraer_Flights AS
SELECT Flight.Flight_Number, Aircraft.Model, Flight.Origin, Flight.Destination FROM
Aircraft JOIN Flight ON Aircraft.Aircraft_ID = Flight.Aircraft_ID
WHERE Aircraft.Model LIKE 'Embraer%';

CREATE VIEW Cessna_Flights AS
SELECT Flight.Flight_Number, Aircraft.Model, Flight.Origin, Flight.Destination FROM
Aircraft JOIN Flight ON Aircraft.Aircraft_ID = Flight.Aircraft_ID
WHERE Aircraft.Model LIKE 'Cessna%';

CREATE VIEW Bombardier_Flights AS
SELECT Flight.Flight_Number, Aircraft.Model, Flight.Origin, Flight.Destination FROM
Aircraft JOIN Flight ON Aircraft.Aircraft_ID = Flight.Aircraft_ID
WHERE Aircraft.Model LIKE 'Bombardier%';
