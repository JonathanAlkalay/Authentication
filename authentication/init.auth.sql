-- Active: 1668637672591@@127.0.0.1@3306@authentication
DROP DATABASE if EXISTS authentication;

CREATE DATABASE authentication;

USE authentication;

CREATE Table users(
    id          VARCHAR(255) NOT NULL,
    email       TEXT         NOT NULL,
    password    TEXT         NOT NULL,

    PRIMARY KEY(id),

    INDEX(email(80), password(50))
);

CREATE TABLE roles(
    id          VARCHAR(255) NOT NULL,
    userId      VARCHAR(255) NOT NULL,
    role        TEXT,

    PRIMARY KEY(id),
    FOREIGN KEY(userId) REFERENCES users(id),

    INDEX(role(50))
);

CREATE Table refreshTokens(
    id              VARCHAR(255) NOT NULL,
    userId          VARCHAR(255) NOT NULL,
    token           TEXT         NOT NULL,
    isActive        BOOLEAN      NOT NULL,
    
    PRIMARY KEY(id),
    FOREIGN KEY(userId) REFERENCES users(id),

    INDEX(token(750), isActive)
);

INSERT INTO users(id, email, password)
VALUES ('1', 'darth', 'vader');