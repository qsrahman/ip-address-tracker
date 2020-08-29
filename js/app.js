'use strict'

const ipAddressForm = document.querySelector('#address-form')
const ipAddress = document.querySelector('#ip-address-input')
const ipOutput = document.querySelector('#ip-output')
const locationOutput = document.querySelector('#location-output')
const timezoneOutput = document.querySelector('#timezone-output')
const ispOutput = document.querySelector('#isp-output')

function drawMap(lat, lon) {
    const map = L.map('map').setView([lat, lon], 13)

    L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        {
            maxZoom: 18,
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
        }
    ).addTo(map)

    const locationIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [46, 56],
        iconAnchor: [23, 56],
    })

    L.marker([lat, lon], {
        icon: locationIcon,
    }).addTo(map)
}

ipAddressForm.addEventListener('submit', e => {
    e.preventDefault()

    if (ipAddress.value !== '') {
        fetch(`http://ip-api.com/json/${ipAddress.value}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                ipOutput.innerText = data.query
                locationOutput.innerText = `${data.city}, ${data.region} ${data.zip}`
                timezoneOutput.innerText = data.timezone
                ispOutput.innerText = data.isp

                drawMap(data.lat, data.lon)
            })
            .catch(error => console.log(error))
    }
    ipAddress.value = ''
})

drawMap(33.9923, 71.5593)
