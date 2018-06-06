const polka = require('polka')
const servestatic = require('serve-static')
const { join } = require('path')
const { json } = require('body-parser')
const {
    getAllParkingCars,
    getFreePlaces,
    parkCar,
    leaveParkinglot
} = require('./data/parkinglot')
const send = require('@polka/send-type')

polka()
    .use(servestatic(join(__dirname, '../client')), json())
    .get('/allcars', async (req, res) => {
        const parkingCars = await getAllParkingCars()
        send(res, 200, parkingCars)
    })
    .get('/freeplaces', async (req, res) => {
        const freeplaces = await getFreePlaces()
        send(res, 200, freeplaces)
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
