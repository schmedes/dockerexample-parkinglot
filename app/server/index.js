const polka = require('polka')
const servestatic = require('serve-static')
const { join } = require('path')
const { json, urlencoded } = require('body-parser')
const {
    getParkingCars,
    parkCar,
    leaveParkinglot
} = require('./data/parkinglot')
const { calculateFreePlaces } = require('./services/parkinglotservice')
const send = require('@polka/send-type')

polka()
    .use(
        servestatic(join(__dirname, '../client')),
        urlencoded({ extended: false }),
        json()
    )
    .get('/allcars', async (req, res) => {
        const parkingCars = await getParkingCars()
        send(res, 200, parkingCars)
    })
    .get('/freeplaces', async (req, res) => {
        const freeplaces = await calculateFreePlaces()
        send(res, 200, freeplaces)
    })
    .get('/parkinfo', async (req, res) => {
        const parkinfo = await getParkingCars(req.query.licenceplate)
        send(res, 200, parkinfo)
    })
    .post('/parkcar', async (req, res) => {
        const { licenceplate, reserved } = req.body
        const parkedCar = parkCar(licenceplate, reserved)
        send(res, 200, parkedCar)
    })
    .post('/leaveparkinglot', async (req, res) => {
        const { licenceplate } = req.body
        const unparkedCar = leaveParkinglot(licenceplate)
        send(res, 200, unparkedCar)
    })
    .listen(8080)
