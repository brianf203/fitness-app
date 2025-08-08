-- Authors: Brian Fang and Esther Prusynski
-- Description: Additional stored procedures for demo CUD and utility

DELIMITER //
DROP PROCEDURE IF EXISTS sp_demo_delete_bob_smith //
CREATE PROCEDURE sp_demo_delete_bob_smith()
BEGIN
    DELETE FROM Clients WHERE email = 'hello@gmail.com' AND firstName = 'Bob' AND lastName = 'Smith';
END //
DELIMITER ;


