const submitContainer = document.querySelector('input[type="submit"]')
const valueContainer = document.querySelector('#licenceplate')
const leaveContainer = document.querySelector('#leave')
const errorContainer = document.querySelector('.error')
const costcontainer = document.querySelector('.cost')
const parkinfo = document.querySelector('.parkinfo')
const startDate = parkinfo.querySelector('[name="startdate"]')
const endDate = parkinfo.querySelector('[name="enddate"]')

submitContainer.addEventListener('click', e => {
    e.preventDefault()
    const licencePlate = valueContainer.value

    fetch(`/parkinfo?licenceplate=${licencePlate}`)
        .then(res => res.json())
        .then(
            res =>
                res[0]
                    ? activateParkinfo(new Date(res[0].entrydate), res[0])
                    : (errorContainer.innerHTML = 'Kennzeichen nicht gefunden')
        )
})

valueContainer.addEventListener('keydown', () => {
    activateParkinfo()
    errorContainer.innerHTML = ''
})

function activateParkinfo(startdate, entity) {
    if (!startdate) {
        leaveContainer.disabled = true
        parkinfo.setAttribute('style', '')
        return
    }

    leaveContainer.disabled = false
    parkinfo.setAttribute('style', 'display: block')
    startDate.innerHTML = startdate.toLocaleString()
    endDate.innerHTML = new Date().toLocaleString()
    entity.reserved
        ? (costcontainer.innerHTML = '')
        : (costcontainer.innerHTML = `Preis: ${Math.ceil(
              (new Date().getTime() - startdate.getTime()) / (1000 * 60 * 60)
          ) * 5}€`)
}

leaveContainer.addEventListener('click', () => {
    const licencePlate = valueContainer.value

    fetch('/leaveparkinglot', {
        method: 'POST',
        body: JSON.stringify({
            licenceplate: licencePlate
        }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(() => setTimeout(() => (window.location = '/'), 200))
})
