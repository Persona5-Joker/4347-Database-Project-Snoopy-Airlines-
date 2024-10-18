CREATE DATABASE SNOOPY_AIRLINES;
USE SNOOPY_AIRLINES;

CREATE TABLE Aircraft (
    Aircraft_ID INT AUTO_INCREMENT PRIMARY KEY,
    Model VARCHAR(100) NOT NULL,
    Has_WiFi BOOLEAN NOT NULL,
    Has_Power_Outlets BOOLEAN NOT NULL,
    Number_Of_Seats INT NOT NULL
);

CREATE TABLE Flight (
    Flight_ID INT AUTO_INCREMENT PRIMARY KEY,
    Flight_Number VARCHAR(10) NOT NULL,
    Aircraft_ID INT NOT NULL,
    Departure DATETIME NOT NULL,
    Arrival DATETIME NOT NULL,
    Origin VARCHAR(100) NOT NULL,
    Destination VARCHAR(100) NOT NULL,
    FOREIGN KEY (Aircraft_ID) REFERENCES Aircraft(Aircraft_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Reservation (
    Reservation_ID INT AUTO_INCREMENT PRIMARY KEY,
    Booking_Reference_Number VARCHAR(20) NOT NULL UNIQUE,
    Flight_ID INT NOT NULL,
    Reservation_Date DATETIME NOT NULL,
    Is_Checked_In BOOLEAN NOT NULL,
    FOREIGN KEY (Flight_ID) REFERENCES Flight(Flight_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Reservation_Contact (
    Reservation_Contact_ID INT AUTO_INCREMENT PRIMARY KEY,
    Reservation_ID INT NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Passenger (
    Passenger_ID INT AUTO_INCREMENT PRIMARY KEY,
    Reservation_ID INT NOT NULL,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Date_of_Birth DATE NOT NULL,
    FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Baggage table as a weak entity dependent on Passenger
CREATE TABLE Baggage (
    Baggage_ID INT AUTO_INCREMENT,
    Passenger_ID INT,
    Weight DECIMAL(5, 2) NOT NULL,
    PRIMARY KEY (Baggage_ID, Passenger_ID),
    FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Passenger_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- QUERIES

INSERT INTO Aircraft (Model, Has_WiFi, Has_Power_Outlets, Number_Of_Seats) VALUES
('Boeing 737', TRUE, TRUE, 160),
('Airbus A320', TRUE, FALSE, 180),
('Boeing 777', TRUE, TRUE, 300),
('Airbus A330', TRUE, TRUE, 250),
('Embraer 175', FALSE, FALSE, 88),
('Bombardier Q400', FALSE, FALSE, 78),
('Boeing 787', TRUE, TRUE, 242),
('Airbus A350', TRUE, TRUE, 315),
('Cessna 208', FALSE, FALSE, 12),
('Boeing 747', TRUE, TRUE, 416),
('Boeing 767', TRUE, TRUE, 211),
('Airbus A380', TRUE, TRUE, 555),
('Airbus A220', TRUE, TRUE, 140),
('Boeing 757', TRUE, TRUE, 239),
('Boeing 717', TRUE, FALSE, 106),
('Embraer 190', TRUE, TRUE, 100),
('Bombardier CRJ700', FALSE, FALSE, 70),
('Boeing 727', FALSE, FALSE, 189),
('Airbus A310', TRUE, FALSE, 280),
('McDonnell Douglas MD-80', FALSE, FALSE, 172),
('Airbus A321', TRUE, TRUE, 220), 
('Boeing 720', FALSE, FALSE, 149),
('Boeing 707', FALSE, FALSE, 174),
('Airbus A319', TRUE, TRUE, 156),
('Embraer E170', FALSE, FALSE, 76);

INSERT INTO Flight (Flight_Number, Aircraft_ID, Departure, Arrival, Origin, Destination) VALUES
('SN123', 1, '2024-10-15 08:00:00', '2024-10-15 12:00:00', 'New York', 'Los Angeles'),
('SN456', 2, '2024-10-16 09:30:00', '2024-10-16 13:30:00', 'Chicago', 'Miami'),
('SN789', 3, '2024-10-17 06:00:00', '2024-10-17 10:00:00', 'Dallas', 'Denver'),
('SN101', 4, '2024-10-18 11:00:00', '2024-10-18 14:30:00', 'San Francisco', 'Seattle'),
('SN102', 5, '2024-10-19 07:45:00', '2024-10-19 10:45:00', 'Las Vegas', 'Houston'),
('SN103', 6, '2024-10-20 08:30:00', '2024-10-20 11:00:00', 'Orlando', 'Boston'),
('SN104', 7, '2024-10-21 12:00:00', '2024-10-21 16:00:00', 'Atlanta', 'Washington DC'),
('SN105', 8, '2024-10-22 13:00:00', '2024-10-22 17:00:00', 'Phoenix', 'Salt Lake City'),
('SN106', 9, '2024-10-23 14:30:00', '2024-10-23 17:30:00', 'San Diego', 'Portland'),
('SN107', 10, '2024-10-24 16:00:00', '2024-10-24 20:00:00', 'Austin', 'Nashville'),
('SN108', 11, '2024-10-25 07:00:00', '2024-10-25 11:00:00', 'Detroit', 'Philadelphia'),
('SN109', 12, '2024-10-26 06:30:00', '2024-10-26 11:00:00', 'Las Vegas', 'Los Angeles'),
('SN110', 13, '2024-10-27 09:00:00', '2024-10-27 12:30:00', 'Houston', 'Dallas'),
('SN111', 14, '2024-10-28 11:00:00', '2024-10-28 15:00:00', 'San Francisco', 'Chicago'),
('SN112', 15, '2024-10-29 12:30:00', '2024-10-29 15:00:00', 'Orlando', 'Atlanta'),
('SN113', 16, '2024-10-30 07:00:00', '2024-10-30 09:00:00', 'Phoenix', 'Las Vegas'),
('SN114', 17, '2024-10-31 10:00:00', '2024-10-31 14:00:00', 'New York', 'Washington DC'),
('SN115', 18, '2024-11-01 06:00:00', '2024-11-01 09:00:00', 'Los Angeles', 'San Francisco'),
('SN116', 19, '2024-11-02 08:00:00', '2024-11-02 12:00:00', 'Miami', 'Houston'),
('SN117', 20, '2024-11-03 13:30:00', '2024-11-03 17:30:00', 'Denver', 'Seattle'),
('SN118', 21, '2024-11-04 01:00:00', '2024-11-04 04:38:00', 'Dallas', 'New York'),
('SN119', 22, '2024-11-05 07:00:00', '2024-11-05 11:54:00', 'Seattle', 'Atlanta'),
('SN120', 23, '2024-11-06 09:00:00', '2024-11-06 10:57:00', 'Miami', 'Atlanta'),
('SN121', 24, '2024-11-07 10:00:00', '2024-11-08 01:49:00', 'Salem', 'Austin'),
('SN122', 25, '2024-11-08 03:00:00', '2024-11-08 05:22:00', 'Louisville', 'Houston');


INSERT INTO Reservation (Booking_Reference_Number, Flight_ID, Reservation_Date, Is_Checked_In) VALUES
('BR123456', 1, '2024-10-12 10:00:00', FALSE),
('BR234567', 2, '2024-10-13 11:00:00', TRUE),
('BR345678', 3, '2024-10-14 09:30:00', FALSE),
('BR456789', 4, '2024-10-15 12:00:00', TRUE),
('BR567890', 5, '2024-10-16 14:00:00', FALSE),
('BR678901', 6, '2024-10-17 08:00:00', TRUE),
('BR789012', 7, '2024-10-18 15:00:00', FALSE),
('BR890123', 8, '2024-10-19 17:00:00', TRUE),
('BR901234', 9, '2024-10-20 09:00:00', FALSE),
('BR012345', 10, '2024-10-21 18:00:00', TRUE),
('BR112233', 11, '2024-10-22 20:00:00', FALSE),
('BR223344', 12, '2024-10-23 22:00:00', TRUE),
('BR334455', 13, '2024-10-24 07:30:00', FALSE),
('BR445566', 14, '2024-10-25 09:00:00', TRUE),
('BR556677', 15, '2024-10-26 10:30:00', FALSE),
('BR667788', 16, '2024-10-27 12:00:00', TRUE),
('BR778899', 17, '2024-10-28 14:00:00', FALSE),
('BR889900', 18, '2024-10-29 16:00:00', TRUE),
('BR990011', 19, '2024-10-30 08:00:00', FALSE),
('BR001122', 20, '2024-10-31 06:00:00', TRUE);

INSERT INTO Reservation_Contact (Reservation_ID, Email, Phone) VALUES
(1, 'john.doe@example.com', '555-1234'),
(2, 'jane.smith@example.com', '555-5678'),
(3, 'michael.jones@example.com', '555-2345'),
(4, 'emily.davis@example.com', '555-6789'),
(5, 'david.brown@example.com', '555-3456'),
(6, 'linda.wilson@example.com', '555-7890'),
(7, 'james.miller@example.com', '555-4567'),
(8, 'barbara.moore@example.com', '555-8901'),
(9, 'robert.taylor@example.com', '555-5679'),
(10, 'patricia.anderson@example.com', '555-9012'),
(11, 'charles.thomas@example.com', '555-6780'),
(12, 'susan.jackson@example.com', '555-0123'),
(13, 'paul.white@example.com', '555-3457'),
(14, 'nancy.harris@example.com', '555-7891'),
(15, 'mark.martin@example.com', '555-4568'),
(16, 'betty.clark@example.com', '555-8902'),
(17, 'george.lewis@example.com', '555-567');

INSERT INTO Passenger (Reservation_ID, First_Name, Last_Name, Date_of_Birth) VALUES
(1, 'John', 'Doe', '1985-05-12'),
(2, 'Jane', 'Smith', '1990-09-25'),
(3, 'Michael', 'Jones', '1978-03-14'),
(4, 'Emily', 'Davis', '1995-11-30'),
(5, 'Danielle', 'Bryan', '1988-02-05'),
(6, 'Wei Yuan', 'Liew', '1992-10-21'),
(7, 'Tanvi', 'Nair', '1999-07-16'),
(8, 'Dandan', 'Wang', '1984-12-12'),
(9, 'Mandy', 'Hardono', '1993-04-04'),
(10, 'Laura', 'Pinto', '1996-08-20'),
(11, 'Meyli', 'Colmenero', '1989-11-03'),
(12, 'Fernando', 'Portillo', '1979-06-11'),
(13, 'Shreyaa', 'Arun', '1995-05-25'),
(14, 'Hunter', 'Matthews', '1982-09-15'),
(15, 'Ebru', 'Cankaya', '1990-03-18'),
(16, 'Robert', 'Taylor', '1971-08-13'),
(17, 'Patricia', 'Anderson', '1980-10-10'),
(18, 'George', 'Lewis', '1968-05-08'),
(19, 'Jessica', 'Walker', '1996-07-19'),
(20, 'Henry', 'King', '1979-02-23');

INSERT INTO Baggage (Passenger_ID, Weight) VALUES
(1, 23.50),    -- John Doe
(2, 18.75),    -- Jane Smith
(3, 21.00),    -- Michael Jones
(4, 19.30),    -- Emily Davis
(5, 22.80),    -- Danielle Bryan
(6, 25.40),    -- Wei Yuan Liew
(7, 24.10),    -- Tanvi Nair
(8, 20.50),    -- Dandan Wang
(9, 23.75),    -- Mandy Hardono
(10, 19.20),   -- Laura Pinto
(11, 22.90),   -- Meyli Colmenero
(12, 26.10),   -- Fernando Portillo
(13, 24.30),   -- Shreyaa Arun
(14, 25.00),   -- Hunter Matthews
(15, 23.40),   -- Ebru Cankaya
(16, 22.75),   -- Robert Taylor
(17, 24.50),   -- Patricia Anderson
(18, 21.30),   -- George Lewis
(19, 25.60),   -- Jessica Walker
(20, 23.90);   -- Henry King


-- QUERIES ON Aircraft TABLE (BESIDES INSERTIONS)

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
SELECT * FROM Flight;
