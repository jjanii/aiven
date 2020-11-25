import { Cloud } from "../api/models";

export type Coords = { latitude: number; longitude: number };

export function calculateDistances(
  data: Array<Cloud>,
  coords: Coords
): Array<Cloud> {
  const { latitude, longitude } = coords;

  return data.map(entry => {
    if (
      typeof entry.geoLatitude === "number" &&
      typeof entry.geoLongitude === "number"
    ) {
      return {
        ...entry,
        distance: distance(
          // Default to Kamppi, Helsinki if we dont have coords yet
          latitude !== 0 ? latitude : 60.168415993,
          longitude !== 0 ? longitude : 24.9333962664,
          entry.geoLatitude,
          entry.geoLongitude
        )
      };
    }
    return entry;
  });
}

function distance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // from https://www.geodatasource.com/developers/javascript
  if (lat1 === lat2 && lon1 === lon2) {
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
