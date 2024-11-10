-- Create database and use it
CREATE DATABASE SNOOPY_AIRLINES_Final;
USE SNOOPY_AIRLINES_Final;

-- Aircraft table
CREATE TABLE Aircraft (
    Aircraft_ID INT AUTO_INCREMENT PRIMARY KEY,
    Model VARCHAR(100) NOT NULL,
    Has_WiFi BOOLEAN NOT NULL,
    Has_Power_Outlets BOOLEAN NOT NULL,
    Number_Of_Seats INT NOT NULL CHECK (Number_Of_Seats > 0) -- Ensure positive seat count
);

-- Flight table
CREATE TABLE Flight (
    Flight_ID INT AUTO_INCREMENT PRIMARY KEY,
    Flight_Number VARCHAR(10) NOT NULL UNIQUE,
    Aircraft_ID INT NOT NULL,
    Departure DATETIME NOT NULL,
    Arrival DATETIME NOT NULL,
    Origin VARCHAR(100) NOT NULL,
    Destination VARCHAR(100) NOT NULL,
    FOREIGN KEY (Aircraft_ID) REFERENCES Aircraft(Aircraft_ID)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CHECK (Arrival > Departure), -- Ensure arrival is after departure
    CHECK (Origin <> Destination) -- Origin and Destination should be different
);

-- Reservation table
CREATE TABLE Reservation (
    Reservation_ID INT AUTO_INCREMENT PRIMARY KEY,
    Booking_Reference_Number VARCHAR(20) NOT NULL UNIQUE,
    Flight_ID INT NOT NULL,
    Reservation_Date DATETIME NOT NULL,
    Is_Checked_In BOOLEAN NOT NULL,
    FOREIGN KEY (Flight_ID) REFERENCES Flight(Flight_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Reservation_Contact table
CREATE TABLE Reservation_Contact (
    Reservation_Contact_ID INT AUTO_INCREMENT PRIMARY KEY,
    Reservation_ID INT NOT NULL,
    Email VARCHAR(100) NOT NULL CHECK (Email LIKE '%_@__%.__%'), -- Basic email format validation
    Phone VARCHAR(15) NOT NULL CHECK (Phone REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$'), -- Phone format (214-555-1234)
    FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Updated Passenger table without Reservation_ID
CREATE TABLE Passenger (
    Passenger_ID INT AUTO_INCREMENT PRIMARY KEY,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Date_of_Birth DATE NOT NULL
);

-- many-to-many relationship between Passenger and Reservation
CREATE TABLE Passenger_Reservation (
    Passenger_ID INT NOT NULL,
    Reservation_ID INT NOT NULL,
    PRIMARY KEY (Passenger_ID, Reservation_ID),
    FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Passenger_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Baggage table as a weak entity dependent on Passenger
CREATE TABLE Baggage (
    Baggage_ID INT AUTO_INCREMENT,
    Passenger_ID INT,
    Weight DECIMAL(5 , 2 ) NOT NULL CHECK (Weight > 0 AND Weight <= 50),
    PRIMARY KEY (Baggage_ID , Passenger_ID),
    FOREIGN KEY (Passenger_ID)
        REFERENCES Passenger (Passenger_ID)
        ON DELETE CASCADE ON UPDATE CASCADE
);
