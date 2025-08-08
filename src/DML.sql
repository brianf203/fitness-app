-- DML for Community Fitness Center app
-- Parameter placeholders use :name to indicate values supplied by the backend.
-- Queries mirror the UI operations (lists, inserts, updates, deletes).

-- Query to get all Class IDs and Descriptions to populate a class dropdown
SELECT classID, classDescription FROM classes

-- Query to get all clients and client information for the Client List page
SELECT clients.clientID, firstName, lastName, email, phoneNumber, membershipStartDate, membershipActive, monthlyFee 
FROM Clients

-- Query to get a single client's data for the Update Client form 
-- : character is used to denote variables fulfilled by backend programming language
SELECT clientID, firstName, lastName, email, phoneNumber, membershipStartDate,membershipActive, monthlyFee 
FROM Clients 
WHERE clientID = :clientID_selected_from_search_client_page

-- Query to get a single instructor's data for the Update Instructor form
SELECT instructorID, firstName, lastName, email, phoneNumber, certification 
FROM Instructors 
WHERE instructorID = :instructor_ID_selected_from_search_instructor_page

-- Query to get all instructor's data to populate a dropdown for associating with a certification
SELECT instructorID AS instructorID, firstName, lastName, email, phoneNumber, certification 
FROM Instructors

-- Query to add a new Client
-- : character is used to denote variables fulfilled by backend programming language
INSERT into Clients (firstName, lastName, email, phoneNumber, membershipStartDate, membershipActive, monthlyFee) 
VALUES (:firstNameInput, :lastNameInput, :emailInput, :phoneNumberInput, :membershipStartDateInput, :membershipActiveInput, :monthlyFeeInput)

-- Query to add a new Instructor
-- : character is used to denote variables fulfilled by backend programming language
INSERT into Instructors (firstName, lastName, email, phoneNumber, certification) 
VALUES (:firstNameInput, :lastNameInput, :emailInput, :phoneNumberInput, :certificationInput)

-- Query to add a new Class
-- : character is used to denote variables fulfilled by backend programming language
INSERT into Classes (className, classDescription, classCapacity, instructorID, roomNum, startTime, endTime) 
VALUES (:classNameInput, :classDescriptionInput, :classCapacityInput, :instructorIDInput, :roomNumInput, :startTimeInput, :endTimeInput)

-- Query to add a new Registration
-- : character is used to denote variables fulfilled by backend programming language
INSERT into Registrations (registerDate, clientID, classID) 
VALUES (:registerDateInput, :clientIDInput, :classIDInput)

-- Query to add a new Room
-- : character is used to denote variables fulfilled by backend programming language
INSERT into Rooms (capacity) 
VALUES (:roomCapacityInput)

-- Query to get all Clients
SELECT firstName, lastName, email, phoneNumber, membershipStartDate, membershipActive, monthlyFee 
FROM Clients

-- Query to get all Instructors
SELECT firstName, lastName, email, phoneNumber, certification
FROM Instructors

-- Query to get all Classes
SELECT className, classDescription, classCapacity, startTime, endTime
FROM Classes

-- Query to get a Class
-- : character is used to denote variables fulfilled by backend programming language
SELECT * FROM Classes
WHERE classID = :classID_selected_from_class_page

-- Query to get all Registrations
SELECT r.registerDate, CONCAT(cl.firstName, ' ', cl.lastName) AS clientName, c.className
FROM Registrations r
JOIN Clients cl ON r.clientID = cl.clientID
JOIN Classes c ON r.classID = c.classID;

-- Query to get all Rooms
SELECT roomNum, capacity
FROM Rooms

-- Query to update a client's data based on submission of the Update Client form
-- : character is used to denote variables fulfilled by backend programming language
UPDATE Clients SET firstName = :firstNameInput, lastName = :lastNameInput, email = :emailInput, 
                                phoneNumber = :phoneNumberInput, membershipStartDate = :membershipStartDateInput, 
                                membershipActive = :membershipActiveInput, monthlyFee = :monthlyFeeInput
WHERE clientID = :clientID_from_the_update_form

-- Query to update an instructor's data based on submission of the Update Instructor form
-- : character is used to denote variables fulfilled by backend programming language
UPDATE Instructors SET firstName = :firstNameInput, lastName = :lastNameInput, email = :emailInput, 
                        phoneNumber = :phoneNumberInput, certification = :certificationInput
WHERE instructorID = :instructor_id_from_the_update_form

-- Query to update class information based on submission of the Update Instructor form
-- : character is used to denote variables fulfilled by backend programming language
UPDATE Classes SET className = :classNameInput, classDescription = :classDescriptionInput, classCapacity = :classCapacityInput, 
                    startTime = :startTimeInput, endTime = :endTimeInput, instructorID = :instructorIDInput, roomNum = :roomNumInput
WHERE classID = :classID_from_the_update_form

-- Query to update Room capacity
-- : character is used to denote variables fulfilled by backend programming language
UPDATE Rooms
SET capacity = :newCapacity_selected_from_search_rooms_page
WHERE roomNum = :roomNum_selected_from_search_rooms_page

-- Query to delete a client
-- : character is used to denote variables fulfilled by backend programming language
DELETE FROM Clients WHERE clientID = :clientID_selected_from_search_client_page

-- Query to delete a registration instance
-- : character is used to denote variables fulfilled by backend programming language
DELETE FROM Registrations
WHERE clientID = :clientID_selected_from_search_client_page AND classID = :classID_selected_from_search_class_page

-- Query to delete all registrations associated with a single client
-- : character is used to denote variables fulfilled by backend programming language
DELETE FROM Registrations
WHERE clientID = :client_ID_selected_from_search_client_page

-- Query to delete an instructor
-- : character is used to denote variables fulfilled by backend programming language
DELETE FROM Instructors WHERE instructorID = :instructor_ID_selected_from_search_instructor_page

-- Query to delete a single class
-- : character is used to denote variables fulfilled by backend programming language
DELETE FROM Classes
WHERE classID = :classID_selected_from_class_page

-- Query to delete a single room
-- : character is used to denote variables fulfilled by backend programming language
DELETE FROM Rooms
WHERE roomNum = :roomNum_selected_from_search_rooms_page

