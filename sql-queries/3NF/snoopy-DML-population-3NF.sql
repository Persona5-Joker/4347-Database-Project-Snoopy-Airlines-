use SNOOPY_AIRLINES_3NF;

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

INSERT INTO Reservation_Contact (Reservation_ID, Email, Phone) 
VALUES 
(1, 'john.doe@example.com', '972-555-1234'),
(2, 'jane.smith@example.com', '972-555-5678'),
(3, 'michael.jones@example.com', '214-555-2345'),
(4, 'emily.davis@example.com', '403-555-6789'),
(5, 'david.brown@example.com', '403-555-3456'),
(6, 'linda.wilson@example.com', '972-555-7890'),
(7, 'james.miller@example.com', '972-555-4567'),
(8, 'barbara.moore@example.com', '972-555-8901'),
(9, 'robert.taylor@example.com', '214-555-5679'),
(10, 'patricia.anderson@example.com', '214-555-9012'),
(11, 'charles.thomas@example.com', '872-555-6780'),
(12, 'susan.jackson@example.com', '119-555-0123'),
(13, 'paul.white@example.com', '903-555-3457'),
(14, 'nancy.harris@example.com', '903-555-7891'),
(15, 'mark.martin@example.com', '903-555-4568'),
(16, 'betty.clark@example.com', '214-555-8902'),
(17, 'george.lewis@example.com', '214-555-5670');  

-- Populating the Passenger table
INSERT INTO Passenger (First_Name, Last_Name, Date_of_Birth) VALUES
('John', 'Doe', '1985-04-12'),
('Jane', 'Smith', '1990-11-23'),
('Michael', 'Jones', '1978-06-05'),
('Emily', 'Davis', '1982-02-17'),
('Danielle', 'Bryan', '1995-09-09'),
('Wei Yuan', 'Liew', '1992-07-22'),
('Tanvi', 'Nair', '2001-01-15'),
('Dandan', 'Wang', '1988-12-01'),
('Mandy', 'Hardono', '1993-03-19'),
('Laura', 'Pinto', '1986-05-30'),
('Meyli', 'Colmenero', '1998-08-24'),
('Fernando', 'Portillo', '1991-10-07'),
('Shreyaa', 'Arun', '1999-04-14'),
('Hunter', 'Matthews', '1987-02-10'),
('Ebru', 'Cankaya', '1994-06-26'),
('Robert', 'Taylor', '1980-09-05'),
('Patricia', 'Anderson', '1975-01-28'),
('George', 'Lewis', '1968-07-18'),
('Jessica', 'Walker', '2000-11-11'),
('Henry', 'King', '1989-02-22');

-- Populating the Passenger_Reservation table
INSERT INTO Passenger_Reservation (Passenger_ID, Reservation_ID) VALUES
(1, 1),  -- John Doe for Reservation BR123456
(2, 2),  -- Jane Smith for Reservation BR234567
(3, 3),  -- Michael Jones for Reservation BR345678
(4, 4),  -- Emily Davis for Reservation BR456789
(5, 5),  -- Danielle Bryan for Reservation BR567890
(6, 6),  -- Wei Yuan Liew for Reservation BR678901
(7, 7),  -- Tanvi Nair for Reservation BR789012
(8, 8),  -- Dandan Wang for Reservation BR890123
(9, 9),  -- Mandy Hardono for Reservation BR901234
(10, 10), -- Laura Pinto for Reservation BR012345
(11, 11), -- Meyli Colmenero for Reservation BR112233
(12, 12), -- Fernando Portillo for Reservation BR223344
(13, 13), -- Shreyaa Arun for Reservation BR334455
(14, 14), -- Hunter Matthews for Reservation BR445566
(15, 15), -- Ebru Cankaya for Reservation BR556677
(16, 16), -- Robert Taylor for Reservation BR667788
(17, 17), -- Patricia Anderson for Reservation BR778899
(18, 18), -- George Lewis for Reservation BR889900
(19, 19), -- Jessica Walker for Reservation BR990011
(20, 20), -- Henry King for Reservation BR001122

-- Adding some passengers to additional reservations to illustrate the many-to-many relationship
(1, 2),  -- John Doe for Reservation BR234567
(2, 3),  -- Jane Smith for Reservation BR345678
(3, 4),  -- Michael Jones for Reservation BR456789
(4, 5),  -- Emily Davis for Reservation BR567890
(5, 6);  -- Danielle Bryan for Reservation BR678901

-- Inserting baggage entries associated directly with Passenger_Reservation_ID
INSERT INTO Baggage (Passenger_Reservation_ID, Weight) VALUES
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
(20, 23.90),   -- Henry King

-- Additional entries
(21, 23.50),    -- John Doe
(22, 18.75),    -- Jane Smith
(23, 21.00),    -- Michael Jones
(24, 19.30),    -- Emily Davis
(25, 22.80);    -- Danielle Bryan
