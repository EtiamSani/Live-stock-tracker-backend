-- Deploy stocktracker:1.create_tables to pg


BEGIN;

CREATE DOMAIN "email" AS text
CHECK(
    value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);

CREATE DOMAIN "positif" AS NUMERIC(10, 2) 
CHECK (
    VALUE >= 0
);


CREATE TABLE "company" 
(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NULL,
    "symbol" TEXT NULL,
    "updated_at" TIMESTAMPTZ DEFAULT NOW(), 
    "entryprice" positif NULL
);

CREATE INDEX company_data ON company (name,symbol);

CREATE TABLE "investor" 
(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "nickname" TEXT NOT NULL UNIQUE,
    "email" email NOT NULL UNIQUE,
    "updated_at" TIMESTAMPTZ DEFAULT NOW(), 
    "password" TEXT NOT NULL,
    "profilpicture" TEXT NULL
);


CREATE TABLE "watchlist" 
(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ DEFAULT NOW(), 
    "investor_id" INT NOT NULL REFERENCES "investor"("id")  
);

CREATE TABLE "watchlist_has_company"
(   
    "company_id" INT references company(id),
    "watchlist_id" INT references watchlist(id),
    PRIMARY KEY (company_id, watchlist_id),
    FOREIGN KEY (watchlist_id) REFERENCES watchlist(id) ON DELETE CASCADE

);

COMMIT;


