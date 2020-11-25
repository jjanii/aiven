import { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import { Cloud } from 'api/models';
import { calculateDistances } from 'helpers/location';
import { CloudsApi } from 'api/index';

import { Coords } from './location';

const api = new CloudsApi();

export const usePlatforms = () => {
  const [platforms, setPlatforms] = useState<Array<Cloud>>([]);
  const [coords, setCoords] = useState<Coords>({
    latitude: 0,
    longitude: 0,
  });

  const cloudsState = useFetch(() =>
    api.getCloudPlatforms().then(data => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, console.log);
      }
      return data;
    }),
  );

  const setPosition = (position: { coords: Coords }) => {
    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  useEffect(() => {
    if (cloudsState.type === 'data') {
      const platformsWithDistances = calculateDistances(
        cloudsState.data.clouds,
        coords,
      );
      setPlatforms(platformsWithDistances);
    }
  }, [coords, cloudsState]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    platforms,
    status: cloudsState.type,
    coordsFetched: coords.latitude !== 0 && coords.longitude !== 0,
  };
};
