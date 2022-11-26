-- Active: 1668766747113@@127.0.0.1@3307@authentication
DROP DATABASE if EXISTS authentication;

CREATE DATABASE authentication;

USE authentication;

CREATE Table users(
    id          VARCHAR(255) NOT NULL,
    email       TEXT         NOT NULL,
    password    TEXT         NOT NULL,

    PRIMARY KEY(id),
    UNIQUE(email(80)),
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

SET @userId = UUID();

INSERT INTO users(id, email, password)
VALUES (
    @userId, 
    'darth', 
    '$2b$15$UogetO6Q3.sa3fb5YeU/seapG666.hXxTzGrkVD37jye3J93hvEQK'
);

INSERT INTO roles(id, userId, role)
VALUES (
    UUID(),
    @userId,
    'USER'
);

INSERT INTO roles(id, userId, role)
VALUES (
    UUID(),
    @userId,
    'ADMIN'
);