import { Cloud } from "../api/models";

let latitude: number = 0;
let longitude: number = 0;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  }
}

export function calculateDistances(
  data: Array<Cloud>,
  coords: { latitude: number; longitude: number }
) {
  const { latitude, longitude } = coords;

  return data.map(entry => {
    if (latitude && longitude && entry.geoLatitude && entry.geoLongitude) {
      return {
        ...entry,
        distance: distance(
          latitude,
          longitude,
          entry.geoLatitude,
          entry.geoLongitude
        )
      };
    }
    return entry;
  });
}

function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
  // from https://www.geodatasource.com/developers/javascript
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344;

    return Math.round(dist);
  }
}

function setPosition(position: {
  coords: { latitude: number; longitude: number };
}) {
  console.log("jee", position);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}
