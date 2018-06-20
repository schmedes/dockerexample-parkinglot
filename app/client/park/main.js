const freeSpacesContainer = document.querySelector('.freeLot')
const submitContainer = document.querySelector('input[type="submit"]')
const reservedContainer = document.querySelector('#reserved')

const freeSpaces = () =>
    fetch('/freeplaces')
        .then(res => res.json())
        .then(res => {
            const freePlaces = !reservedContainer.checked
                ? res.freePlaces - res.reserved > 4
                    ? res.freePlaces - res.reserved
                    : 0
                : res.freePlaces
            submitContainer.disabled = !freePlaces
            freeSpacesContainer.innerHTML = `${freePlaces}`
        })

freeSpaces()

setInterval(() => freeSpaces(), 2000)

reservedContainer.addEventListener('change', () => freeSpaces)

submitContainer.addEventListener('click', e => {
    e.preventDefault()
    const licencePlate = document.querySelector('#licenceplate').value
    const reserved = reservedContainer.checked

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
