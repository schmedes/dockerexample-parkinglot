const { MAX_LIMITS, RESERVED_PLACES } = require('../constants')
const query = require('./query')

const getFreePlaces = async () =>
    query(
        `SELECT ${MAX_LIMITS} - COUNT(1) AS FreePlaces FROM Parkinglot WHERE Exitdate IS NULL`
    ).then(res => parseInt(res.rows[0].freeplaces, 10))

const getUsedReservedPlaces = () =>
    query(
        `SELECT ${RESERVED_PLACES} - COUNT(1) AS ReservedPlaces FROM Parkinglot WHERE Exitdate IS NULL AND Reserved='1'`
    ).then(res => parseInt(res.rows[0].reservedplaces, 10))

const parkCar = (licencePlate, reserved) =>
    query(
        `INSERT INTO Parkinglot (Licenceplate, Entrydate, Reserved) VALUES ($1, $2, $3)`,
        [licencePlate, new Date(), reserved]
    )

const leaveParkinglot = licencePlate =>
    query(
        `UPDATE Parkinglot SET Exitdate = $1 WHERE Exitdate IS NULL and Licenceplate = $2`,
        [new Date(), licencePlate]
    )

const getParkingCars = (licenceplate = '%%') =>
    query(
        `SELECT * FROM Parkinglot where Exitdate IS NULL AND Licenceplate LIKE $1`,
        [licenceplate]
    ).then(res => res.rows)

module.exports = {
    getFreePlaces,
    getParkingCars,
    leaveParkinglot,
    parkCar,
    getUsedReservedPlaces
}
