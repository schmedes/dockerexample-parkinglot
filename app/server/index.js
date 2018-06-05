const polka = require('polka')
const servestatic = require('serve-static')
const { join } = require('path')
const { getAllParkingCars } = require('./data/parkinglot')
const send = require('@polka/send-type')

polka()
    .use(servestatic(join(__dirname, '../client')))
    .get('/allcars', async (req, res) => {
        const parkingCars = await getAllParkingCars()
        send(res, 200, parkingCars)
    })
    .listen(8080)
