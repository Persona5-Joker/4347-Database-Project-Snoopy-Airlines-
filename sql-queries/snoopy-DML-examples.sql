-- QUERIES ON Aircraft TABLE (BESIDES INSERTIONS)

-- Insert: Insert new aircraft called Embraer E173
INSERT INTO Aircraft (Model, Has_WiFi, Has_Power_Outlets, Number_Of_Seats) VALUES
('Embraer E173', FALSE, TRUE, 76);
SELECT * FROM Aircraft WHERE Model = "Embraer E173";

-- QUERY: Display the Aircraft ID and Model of planes that have WiFi
SELECT Aircraft_ID, Model 
FROM Aircraft
WHERE Has_WiFi = TRUE;

-- UPDATE: Change capacity to 50 for all planes from the Aircraft table that are Boeing aircrafts, then display result
UPDATE Aircraft
SET Number_Of_Seats = 50
WHERE Model LIKE 'Boeing%';
SELECT * FROM Aircraft;

-- DELETE: Delete Aircraft entries with no power outlets, then display Aircraft table
DELETE FROM Aircraft
WHERE Has_Power_Outlets = FALSE;
SELECT * FROM Aircraft;

-- QUERIES ON Baggage TABLE (BESIDES INSERTIONS)

-- Insert: New baggage for Henry King with weight of 40.90
INSERT INTO Baggage (Passenger_ID, Weight) VALUES
(20, 40.90);
SELECT * FROM Baggage WHERE Passenger_ID = 20;

-- QUERY: Display the Passenger_ID and Weight of passengers whose baggage weighs more than 25.0 lbs
SELECT Passenger_ID, Weight
FROM Baggage
WHERE Weight > 25.0;

-- UPDATE: Change the baggage weight of the passenger with Passenger_ID = 12 to 30.5 lbs, then display this passenger's Baggage data
UPDATE Baggage
SET Weight = 30.5
WHERE Passenger_ID = 12;
SELECT *
FROM Baggage
Where Passenger_ID = 12;

-- DELETE: Delete the entry in Baggage associated with Baggage_ID = 10, then display Baggage table
DELETE FROM Baggage
WHERE Baggage_ID = 10;
SELECT * FROM Baggage;

-- QUERIES ON Flight TABLE (BESIDES INSERTIONS)

-- Insert: New flight from Dallas to Chicago
INSERT INTO Flight (Flight_Number, Aircraft_ID, Departure, Arrival, Origin, Destination) VALUES
('SN199', 25, '2024-11-10 03:00:00', '2024-11-10 05:22:00', 'Dallas', 'Chicago');
SELECT * FROM Flight WHERE Flight_Number = "SN199";

-- QUERY: Display the Flight_ID, Departure and Arrival times, and Destination for flights leaving Dallas
SELECT Flight_ID, Departure, Arrival, Destination
FROM Flight
WHERE Origin = 'Dallas';

-- UPDATE: Update the Arrival time to 11:00:00 on October 17, 2024 for the flight with Flight_ID = 3, then display the Flight data for Flight_ID = 3
UPDATE Flight
SET Arrival = '2024-10-17 11:00:00'
WHERE Flight_ID = 3;
SELECT *
FROM Flight
WHERE Flight_ID = 3;

-- DELETE: Delete all flights from the Flight table where the departing location is New York, then display the Flight table
DELETE FROM Flight
WHERE Origin = 'New York';
SELECT *
FROM Flight;

-- QUERIES ON Passenger TABLE (BESIDES INSERTIONS)

-- Insert: Insert new passenger with name Jane Lewis to existing reservation
INSERT INTO Passenger (Reservation_ID, First_Name, Last_Name, Date_of_Birth) VALUES
(18, 'Jane', 'Lewis', '1979-02-26');
SELECT * FROM Passenger WHERE First_Name = "Jane" and Last_Name = "Lewis";

-- Query: Display all passenger's last names that start with the letter 'M'.
SELECT Last_Name
FROM Passenger
WHERE Last_Name LIKE 'M%';

-- Update: Update a passenger's first name and last name.
UPDATE Passenger
SET First_Name = 'John Von', Last_Name = 'Neumann'
WHERE Passenger_ID = 1;
SELECT * FROM Passenger WHERE Passenger_ID = 1;

-- Delete: Delete a passenger with the id '1' (i.e. John Doe will be deleted).
DELETE FROM Passenger
WHERE Passenger_ID = 1;
SELECT * FROM Passenger WHERE Passenger_ID = 1;

-- QUERIES ON Reservation TABLE (BESIDES INSERTIONS)

-- Insert: Insert new reservation to the table with booking reference BR001122
INSERT INTO Reservation (Booking_Reference_Number, Flight_ID, Reservation_Date, Is_Checked_In) VALUES
('BR001123', 20, '2024-10-31 08:00:00', TRUE);
SELECT * FROM Reservation WHERE Booking_Reference_Number = "BR001123";

-- Query: Retrieves all reservations along with their booking refrence numbers.
Select * FROM Reservation;

-- Update: Updates the date and check-in status of a reservation based on the Reservation_ID.
UPDATE Reservation
SET Reservation_Date = '2024-10-20 14:30:00', Is_Checked_In = TRUE
WHERE Reservation_ID = 1;

-- Delete: Deletes a reservation based on the Reservation_ID.
DELETE FROM Reservation
WHERE Reservation_ID = 1;

-- QUERIES ON Reservation_Contact TABLE (BESIDES INSERTIONS)

-- Inseert: Insert new reservation contact to an existing reservation
INSERT INTO Reservation_Contact (Reservation_ID, Email, Phone) 
VALUES (17, 'jane.lewis@example.com', '214-555-5467');  
SELECT * FROM WHERE Reservation_ID = 17;

-- Query: List all reservation contact details with phone numbers that begin with '214'.
SELECT * FROM Reservation_Contact
WHERE Phone LIKE '214-%';

-- Update: Update the email and phone number for a specified reservation contact based on Reservation_Contact_ID.
UPDATE Reservation_Contact
SET Email = 'johndoe@insertdomain.com', Phone = '555-555-5545'
WHERE Reservation_Contact_ID = 1;

-- Delete: Delete a reservation contact based on the Reservation_Contact_ID.
DELETE FROM Reservation_Contact
WHERE Reservation_Contact_ID = 1;
