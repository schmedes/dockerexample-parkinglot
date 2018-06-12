const { getFreePlaces, getUsedReservedPlaces } = require('../data/parkinglot')

const calculateFreePlaces = async () => {
    const freePlaces = await getFreePlaces()
    const reservedPlaces = await getUsedReservedPlaces()

    return {
        reserved: reservedPlaces > 0 ? reservedPlaces : 0,
        freePlaces
    }
}

module.exports = {
    calculateFreePlaces
}
