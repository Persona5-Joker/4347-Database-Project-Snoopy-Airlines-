
-- Creating the VIEWS

CREATE VIEW High_Cargo_Passengers AS
SELECT DISTINCT Passenger.First_Name, Passenger.Last_Name, Baggage.Weight AS Baggage_Weight FROM
Passenger JOIN Baggage ON Passenger.Passenger_ID = Baggage.Passenger_ID
WHERE Baggage.Weight > (SELECT AVG(Weight) FROM Baggage);

SELECT * FROM High_Cargo_Passengers;

CREATE VIEW Boeing_Flights AS
SELECT Flight.Flight_Number, Aircraft.Model, Flight.Origin, Flight.Destination FROM
Aircraft JOIN Flight ON Aircraft.Aircraft_ID = Flight.Aircraft_ID
WHERE Aircraft.Model LIKE 'Boeing%';

SELECT * FROM Boeing_Flights;

CREATE VIEW Airbus_Flights AS
SELECT Flight.Flight_Number, Aircraft.Model, Flight.Origin, Flight.Destination FROM
Aircraft JOIN Flight ON Aircraft.Aircraft_ID = Flight.Aircraft_ID
WHERE Aircraft.Model LIKE 'Airbus%';

SELECT * FROM Airbus_Flights;

CREATE VIEW Embraer_Flights AS
SELECT Flight.Flight_Number, Aircraft.Model, Flight.Origin, Flight.Destination FROM
Aircraft JOIN Flight ON Aircraft.Aircraft_ID = Flight.Aircraft_ID
WHERE Aircraft.Model LIKE 'Embraer%';

SELECT * FROM Embraer_Flights;

CREATE VIEW Cessna_Flights AS
SELECT Flight.Flight_Number, Aircraft.Model, Flight.Origin, Flight.Destination FROM
Aircraft JOIN Flight ON Aircraft.Aircraft_ID = Flight.Aircraft_ID
WHERE Aircraft.Model LIKE 'Cessna%';

SELECT * FROM Cessna_Flights;

CREATE VIEW Bombardier_Flights AS
SELECT Flight.Flight_Number, Aircraft.Model, Flight.Origin, Flight.Destination FROM
Aircraft JOIN Flight ON Aircraft.Aircraft_ID = Flight.Aircraft_ID
WHERE Aircraft.Model LIKE 'Bombardier%';

SELECT * FROM Bombardier_Flights;

CREATE VIEW McDonnell_Douglas_Flights AS
SELECT Flight.Flight_Number, Aircraft.Model, Flight.Origin, Flight.Destination FROM
Aircraft JOIN Flight ON Aircraft.Aircraft_ID = Flight.Aircraft_ID
WHERE Aircraft.Model LIKE 'McDonnell Douglas%';

SELECT * FROM McDonnell_Douglas_Flights;