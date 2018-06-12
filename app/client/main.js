const freeSpacesContainer = document.querySelector('.freeLot')
const parkcarContainer = document.querySelector('#parkcar')
const leaveParkinglotContainer = document.querySelector('#leaveLot')

const freeSpaces = () =>
    fetch('/freeplaces')
        .then(res => res.json())
        .then(
            res =>
                (freeSpacesContainer.innerHTML = `${
                    res.freePlaces - res.reserved > 4
                        ? res.freePlaces - res.reserved
                        : 0
                }`)
        )

freeSpaces()

setInterval(() => freeSpaces(), 1000)

leaveParkinglotContainer.addEventListener('keypress', e => {
    if (e.keyCode !== 13) return
    fetch('/leaveparkinglot', {
        method: 'POST',
        body: JSON.stringify({
            licenceplate: e.target.value
        }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(() => (e.target.value = ''))
})

parkcarContainer.addEventListener('keypress', e => {
    if (e.keyCode !== 13) return
    fetch('/parkcar', {
        method: 'POST',
        body: JSON.stringify({ licenceplate: e.target.value, reserved: false }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(() => (e.target.value = ''))
})
