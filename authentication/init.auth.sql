-- Active: 1668636198742@@127.0.0.1@3307
DROP DATABASE if EXISTS authentication;

CREATE DATABASE authentication;

USE authentication;

CREATE Table users(
    id          VARCHAR(255) NOT NULL,
    email       TEXT NOT NULL,
    password    TEXT NOT NULL,

    PRIMARY KEY(id),
    INDEX(email(80), password(50))
);


CREATE Table refreshTokens(
    id              VARCHAR(255) NOT NULL,
    userId          VARCHAR(255) NOT NULL,
    refreshToken    TEXT         NOT NULL,
    isActive        BOOLEAN      NOT NULL,
    
    PRIMARY KEY(id),
    FOREIGN KEY(userId) REFERENCES users(id),
    INDEX(refreshToken(2000))
);