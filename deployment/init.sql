DROP DATABASE if EXISTS deathStar;

CREATE DATABASE deathStar;

USE deathStar;

CREATE Table employees(
    id          VARCHAR(255) NOT NULL,
    name        VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

-- CREATE TABLE managers(

-- );

CREATE Table shifts(
    id          VARCHAR(255) NOT NULL,
    employeeId  VARCHAR(255) NOT NULL,

    FOREIGN KEY (employeeId) REFERENCES employees(id),
    PRIMARY KEY (id)
);