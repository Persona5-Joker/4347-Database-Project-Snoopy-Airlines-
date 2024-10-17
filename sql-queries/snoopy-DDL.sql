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
    FOREIGN KEY (Aircraft_ID) REFERENCES Aircraft(Aircraft_ID)
);

CREATE TABLE Reservation (
    Reservation_ID INT AUTO_INCREMENT PRIMARY KEY,
    Booking_Reference_Number VARCHAR(20) NOT NULL UNIQUE,
    Flight_ID INT NOT NULL,
    Reservation_Date DATETIME NOT NULL,
    Is_Checked_In BOOLEAN NOT NULL,
    FOREIGN KEY (Flight_ID) REFERENCES Flight(Flight_ID)
);

CREATE TABLE Reservation_Contact (
    Reservation_Contact_ID INT AUTO_INCREMENT PRIMARY KEY,
    Reservation_ID INT NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID)
);

CREATE TABLE Passenger (
    Passenger_ID INT AUTO_INCREMENT PRIMARY KEY,
    Reservation_ID INT NOT NULL,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Date_of_Birth DATE NOT NULL,
    FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID)
);

-- Baggage table as a weak entity dependent on Passenger
CREATE TABLE Baggage (
    Baggage_ID INT AUTO_INCREMENT,
    Passenger_ID INT,
    Weight DECIMAL(5, 2) NOT NULL,
    PRIMARY KEY (Baggage_ID, Passenger_ID),
    FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Passenger_ID)
);
