-- Authors: Brian Fang and Esther Prusynski
-- Description: Stored procedure to reset schema and sample data for Community Fitness Center

DELIMITER //
DROP PROCEDURE IF EXISTS sp_reset_fitness //
CREATE PROCEDURE sp_reset_fitness()
BEGIN
    SET FOREIGN_KEY_CHECKS = 0;
    SET AUTOCOMMIT = 0;
    START TRANSACTION;

    DROP TABLE IF EXISTS Registrations;
    DROP TABLE IF EXISTS Classes;
    DROP TABLE IF EXISTS Clients;
    DROP TABLE IF EXISTS Instructors;
    DROP TABLE IF EXISTS Rooms;

    CREATE TABLE Instructors (
        instructorID INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(30) NOT NULL,
        lastName VARCHAR(30) NOT NULL,
        certification TEXT NOT NULL,
        email VARCHAR(30) NOT NULL UNIQUE,
        phoneNumber VARCHAR(15) NOT NULL UNIQUE
    );

    CREATE TABLE Rooms (
        roomNum INT AUTO_INCREMENT PRIMARY KEY,
        capacity INT NOT NULL
    );

    CREATE TABLE Clients (
        clientID INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(30) NOT NULL UNIQUE,
        firstName VARCHAR(30) NOT NULL,
        lastName VARCHAR(30) NOT NULL,
        phoneNumber VARCHAR(15) NOT NULL,
        membershipStartDate DATE NOT NULL,
        membershipActive BOOLEAN NOT NULL,
        monthlyFee DECIMAL(6,2) NOT NULL
    );

    CREATE TABLE Classes (
        classID INT AUTO_INCREMENT PRIMARY KEY,
        className VARCHAR(50) NOT NULL,
        classDescription TEXT,
        classCapacity INT NOT NULL,
        instructorID INT NOT NULL,
        roomNum INT NOT NULL,
        startTime DATETIME NOT NULL,
        endTime DATETIME NOT NULL,
        FOREIGN KEY (instructorID) REFERENCES Instructors(instructorID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (roomNum) REFERENCES Rooms(roomNum) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE Registrations (
        registrationID INT AUTO_INCREMENT PRIMARY KEY,
        clientID INT NOT NULL,
        classID INT NOT NULL,
        registerDate DATE NOT NULL,
        FOREIGN KEY (clientID) REFERENCES Clients(clientID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (classID) REFERENCES Classes(classID) ON DELETE CASCADE ON UPDATE CASCADE
    );

    INSERT INTO Instructors (firstName, lastName, certification, email, phoneNumber)
    VALUES 
    ('Paolo', 'Banchero', 'Yoga Instructor', 'banchero@gmail.com', '503-293-8374'),
    ('Anthony', 'Edwards', 'Cardio Instructor', 'ant@gmail.com', '503-293-4832'),
    ('VJ', 'Edgecombe', 'Strength Training Instructor', 'vj@gmail.com', '503-384-2934');

    INSERT INTO Rooms (capacity)
    VALUES 
    (10),
    (50),
    (25);

    INSERT INTO Clients (email, firstName, lastName, phoneNumber, membershipStartDate, membershipActive, monthlyFee)
    VALUES 
    ('hello@gmail.com', 'Bob', 'Smith', '503-123-1234', '2025-01-01', TRUE, 29.99),
    ('brian@gmail.com', 'Brian', 'Fang', '503-720-5951', '2022-04-05', TRUE, 29.99),
    ('jalenbrunson@gmail.com', 'Jalen', 'Brunson', '503-923-1298', '2024-09-22', TRUE, 29.99),
    ('jaysontatum@gmail.com', 'Jayson', 'Tatum', '503-203-9342', '2025-02-25', FALSE, 29.99);

    INSERT INTO Classes (className, classDescription, classCapacity, instructorID, roomNum, startTime, endTime)
    VALUES 
    ('Yoga', 'Yoga session', 10, 
        (SELECT instructorID FROM Instructors WHERE firstName = 'Paolo' AND lastName = 'Banchero'), 
        (SELECT roomNum FROM Rooms LIMIT 1 OFFSET 0),
        '2025-07-21 08:00:00', '2025-07-21 09:00:00'),

    ('Cardio', 'Cardio session', 50, 
        (SELECT instructorID FROM Instructors WHERE firstName = 'Anthony' AND lastName = 'Edwards'), 
        (SELECT roomNum FROM Rooms LIMIT 1 OFFSET 1),
        '2025-07-21 10:00:00', '2025-07-21 11:00:00'),

    ('Strength Training', 'Strength training session', 25, 
        (SELECT instructorID FROM Instructors WHERE firstName = 'VJ' AND lastName = 'Edgecombe'), 
        (SELECT roomNum FROM Rooms LIMIT 1 OFFSET 2),
        '2025-07-21 18:00:00', '2025-07-21 19:00:00');

    INSERT INTO Registrations (clientID, classID, registerDate)
    VALUES 
    ((SELECT clientID FROM Clients WHERE email = 'hello@gmail.com'), 
     (SELECT classID FROM Classes WHERE className = 'Yoga'),
     '2025-06-15'),

    ((SELECT clientID FROM Clients WHERE email = 'brian@gmail.com'), 
     (SELECT classID FROM Classes WHERE className = 'Cardio'),
     '2025-06-16'),

    ((SELECT clientID FROM Clients WHERE email = 'jalenbrunson@gmail.com'), 
     (SELECT classID FROM Classes WHERE className = 'Yoga'),
     '2025-06-17'),

    ((SELECT clientID FROM Clients WHERE email = 'hello@gmail.com'), 
     (SELECT classID FROM Classes WHERE className = 'Strength Training'),
     '2025-06-18'),

    ((SELECT clientID FROM Clients WHERE email = 'jaysontatum@gmail.com'), 
     (SELECT classID FROM Classes WHERE className = 'Cardio'),
     '2025-06-19');

    COMMIT;
    SET FOREIGN_KEY_CHECKS = 1;
END //
DELIMITER ;