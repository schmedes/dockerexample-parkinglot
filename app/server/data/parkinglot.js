const { MAX_LIMITS, RESERVED_PLACES } = require('../constants')
const query = require('./query')

const getFreePlaces = () =>
    query(
        `SELECT ${MAX_LIMITS} - COUNT(1) AS FreePlaces FROM Parkinglot WHERE Exitdate IS NULL`
    ).then(res => res.rows[0])

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

const getAllParkingCars = () =>
    query(`SELECT * FROM Parkinglot where Exitdate IS NULL`).then(
        res => res.rows
    )

module.exports = {
    getFreePlaces,
    getAllParkingCars,
    leaveParkinglot,
    parkCar
}
