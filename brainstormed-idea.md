# Snoopy Airlines - Database Design Idea

### How the Database Works Together

- **Flight Management**: The **Flight Table** allows you to manage multiple instances of flights (e.g., daily flights) with unique flight IDs, all sharing a common flight number (e.g., AV440).
- **Reservation Process**: When a customer books a flight, a new entry is created in the Reservation Table, linking them to their chosen flight and the associated passengers and baggage. Guests are allowed by setting customer_id to null. Guests can modify their reservations with Booking_Reference_Number and the Last Name of any of the passengers in the reservation.

### Tables

### 1. **Flight Table**

**Purpose**: Stores information about each flight, including details like flight ID, aircraft used, departure/arrival times, and origin/destination locations.

| **Column Name** | **Description** |
| --- | --- |
| **Flight_ID** | Unique identifier for each flight. |
| Flight_Number | Designation for the flight (e.g., AV440). |
| **Aircraft_ID** | Links to the **Aircraft** table. |
| **Departure** | Departure date and time. |
| **Arrival** | Arrival date and time. |
| **Origin** | Departure location. |
| **Destination** | Arrival location. |

### 2. **Aircraft Table**

**Purpose**: Contains information about different aircraft in the airline's fleet.

| **Column Name** | **Description** |
| --- | --- |
| **Aircraft_ID** | Unique identifier for each aircraft. |
| Model | Aircraft model. |
| Has_WiFi | Does it have wifi attribute |
| Number_Of_Seats | Number of seats in the aircraft |
| Has_Power_Outlets | Does it have power outlines attribute |

### 3. **Customer Table**

**Purpose**: Stores customer details for registered users.

| **Column Name** | **Description** |
| --- | --- |
| **Customer_ID** | Unique identifier for each registered customer. |
| **Email** | Customer's email address. |
| **First_Name** | Customer's first name. |
| **Last_Name** | Customer's last name. |
| **Password_Hash** | Hashed password for authentication. |

### 4. **Reservation Table**

**Purpose**: Records details of each reservation made by customers.

| **Column Name** | **Description** |
| --- | --- |
| **Reservation_ID** | Unique identifier for each reservation. |
| **Customer_ID** | Links to the **Customer** table (nullable for guest). |
| **Booking_Reference_Number** | Unique reference number for each booking. |
| **Flight_ID** | Links to the **Flight** table. |
| **Reservation_Date** | Date and time of the reservation. |
| **Contact_Email** | Primary email for communication regarding the reservation. |
| **Contact_Phone** | Primary phone number for communication regarding the reservation. |
| Is_Checked_in | Status of the check in for the flight |

### 5. **Passenger Table**

**Purpose**: Contains information about passengers associated with reservations.

| **Column Name** | **Description** |
| --- | --- |
| **Passenger_ID** | Unique identifier for each passenger. |
| **Reservation_ID** | Links to the **Reservation** table. |
| **First_Name** | Passenger's first name. |
| **Last_Name** | Passenger's last name. |
| **Date_of_Birth** | Passenger's date of birth. |

### 6. **Baggage Table**

**Purpose**: Manages baggage information associated with reservations and passengers.

| **Column Name** | **Description** |
| --- | --- |
| **Baggage_ID** | Unique identifier for each baggage entry. |
| **Reservation_ID** | Links to the **Reservation** table. |
| **Passenger_ID** | Links to the **Passenger** table (to associate baggage with a specific passenger). |
| **Baggage_Type** | Specifies whether the baggage is carry-on or checked. |
| **Weight** | Weight of the baggage. |
| **Dimensions** | Dimensions of the baggage. |

### 7. **Payment Table**

**Purpose**: Records payment details for each reservation.

| **Column Name** | **Description** |
| --- | --- |
| **Payment_ID** | Unique identifier for each payment. |
| **Reservation_ID** | Links to the **Reservation** table. |
| **Payment_Date** | Date and time of payment. |
| **Amount** | Amount paid. |
| **Payment_Method** | Method of payment (e.g., credit card, PayPal). |

### **8. Payment Table**

**Purpose:** Records reservation contact endpoints for updates.

| **Column Name** | **Description** |
| --- | --- |
| **Reservation_Contact_ID** | Unique identifier for each reservation contact. |
| **Reservation_ID** | Links to the **Reservation** table. |
| **Email** | Email address for the contact. |
| **Phone** | Phone number for the contact. |

## Relational Model
![image](https://github.com/user-attachments/assets/bd6ddb4d-2ef8-403a-8715-fc49d18ba23c)

## Sample SQL Statements
```sql
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

CREATE TABLE Customer (
    Customer_ID INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(100) NOT NULL UNIQUE,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Password_Hash VARCHAR(255) NOT NULL
);

CREATE TABLE Reservation (
    Reservation_ID INT AUTO_INCREMENT PRIMARY KEY,
    Customer_ID INT DEFAULT NULL,
    Booking_Reference_Number VARCHAR(20) NOT NULL UNIQUE,
    Flight_ID INT NOT NULL,
    Reservation_Date DATETIME NOT NULL,
    Is_Checked_In BOOLEAN NOT NULL,
    FOREIGN KEY (Customer_ID) REFERENCES Customer(Customer_ID),
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

CREATE TABLE Payment (
    Payment_ID INT AUTO_INCREMENT PRIMARY KEY,
    Reservation_ID INT NOT NULL,
    Payment_Date DATETIME NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    Payment_Method ENUM('Credit Card', 'Paypal', 'Affirm') NOT NULL,
    FOREIGN KEY (Reservation_ID) REFERENCES Reservation(Reservation_ID)
);
```
