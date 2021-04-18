# Following this tutorial: https://www.youtube.com/watch?v=9ylj9NR0Lcg

# This user can only be accessed from localhost
CREATE USER 'titanbox'@'localhost' IDENTIFIED BY 'password';
SELECT user, host FROM mysql.user;
GRANT ALL PRIVILEGES ON * . * TO 'titanbox'@'localhost';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'titanbox'@'localhost';

# This user can be accessed from any host
CREATE USER 'titanbox'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'titanbox'@'%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'titanbox'@'%';

CREATE DATABASE titanbox;
USE titanbox;

# if i ever decide to make it public, i will need authentication and users and households
# the main thought behind it is that users would have access to all boxes in a specified household.
CREATE TABLE users (
                       id INT AUTO_INCREMENT,
                       username VARCHAR(30),
                       firstName VARCHAR(30),
                       lastName VARCHAR(30),
                       PRIMARY KEY (id)
);

CREATE TABLE household (
                           id INT AUTO_INCREMENT,
                           name VARCHAR(50),
                           PRIMARY KEY (id)
);

CREATE TABLE boxes (
                       uuid VARCHAR(36) NOT NULL DEFAULT (UUID()),
                       label VARCHAR(50),
                       contents TEXT DEFAULT (NULL),
                       currentLocation VARCHAR(50) DEFAULT (NULL),
                       QRImage TEXT DEFAULT (NULL),
                       PRIMARY KEY (uuid)
);

# DROP TABLE boxes;