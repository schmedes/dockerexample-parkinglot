CREATE TABLE Parkinglot(
    ID SERIAL primary key,
    Licenceplate VARCHAR NOT NULL,
    Entrydate TIMESTAMP NOT NULL,
    Exitdate TIMESTAMP,
    Reserved BOOLEAN
);