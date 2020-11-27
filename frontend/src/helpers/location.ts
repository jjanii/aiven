import { Cloud } from 'api/models';

export type Coords = {
  latitude: number | undefined;
  longitude: number | undefined;
};

export function calculateDistances(
  data: Array<Cloud>,
  coords: Coords,
): { [cloudName: string]: number } {
  const { latitude, longitude } = coords;

  return data.reduce(
    (obj, item) => ({
      ...obj,
      [item['cloudName']]: distance(
        // Default to Kamppi, Helsinki if we dont have coords yet
        latitude !== undefined ? latitude : 60.168415993,
        longitude !== undefined ? longitude : 24.9333962664,
        item.geoLatitude,
        item.geoLongitude,
      ),
    }),
    {},
  );
}

function distance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  // from https://www.geodatasource.com/developers/javascript
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
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
