// https://api.wheretheiss.at/v1/satellites/25544

let url = "https://api.wheretheiss.at/v1/satellites/25544"
let issLat = document.querySelector("#iss-lat")
let issLong = document.querySelector("#iss-long")
let issUpdateTime = document.querySelector("#iss-update-time")
let centerPoint = [0,0]  // Array of latitude and longitude
let zoomLevel =2  // 1 = whole world, 10 = large city, 20 = city blocks
let updateInterval = 10000
let issMarker
let issIcon = L.icon({
    iconUrl: "https://icons.iconarchive.com/icons/google/noto-emoji-travel-places/1024/42597-satellite-icon.png",
    iconSize: [30,30],
    iconAnchor: [15,15]
})
// Create the map
let map = L.map('iss-map').setView(centerPoint, zoomLevel)

// Add the tile layer - roads, streets etc. Without this, nothing to see
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',
}).addTo(map)

function iss() {
    fetch(url).then(res => {
        return res.json()
    }).then((issData) => {
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long
        //create marker if it does not exist
        // move it if it does exist
        if (!issMarker) {
            issMarker = L.marker([lat,long], {icon: issIcon}).addTo(map)
        } else {
            issMarker.setLatLng([lat,long])
        }
        issUpdateTime.innerHTML = Date()
    }).catch((err) => console.log("ERROR!", err))
}
iss()
setInterval(iss,updateInterval)