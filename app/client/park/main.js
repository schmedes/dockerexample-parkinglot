const freeSpacesContainer = document.querySelector('.freeLot')
const submitContainer = document.querySelector('input[type="submit"]')

const freeSpaces = () =>
    fetch('/freeplaces')
        .then(res => res.json())
        .then(res => {
            const freePlaces =
                res.freePlaces - res.reserved > 4
                    ? res.freePlaces - res.reserved
                    : 0
            submitContainer.disabled = !freePlaces
            freeSpacesContainer.innerHTML = `${freePlaces}`
        })

freeSpaces()

setInterval(() => freeSpaces(), 2000)

submitContainer.addEventListener('click', e => {
    e.preventDefault()
    const licencePlate = document.querySelector('#licenceplate').value
    const reserved = document.querySelector('#reserved').checked

    fetch('/parkcar', {
        method: 'POST',
        body: JSON.stringify({
            licenceplate: licencePlate,
            reserved: reserved
        }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(() => setTimeout(() => (window.location = '/'), 200))
})
