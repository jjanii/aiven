import { useState, useEffect } from 'react';
import { useFetch } from 'hooks/useFetch';
import { calculateDistances } from 'helpers/location';
import { CloudsApi } from 'api/index';

import { Coords } from './location';

const api = new CloudsApi();

export const usePlatforms = () => {
  const [distancesToClouds, setDistancesToClouds] = useState<{
    [cloudName: string]: number;
  }>({});
  const [coordsState, setCoordsState] = useState<{
    coords: { latitude: number | undefined; longitude: number | undefined };
    error: boolean;
  }>({
    coords: { latitude: undefined, longitude: undefined },
    error: false,
  });

  const setPositionError = () => {
    setCoordsState(s => ({ ...s, error: true }));
  };

  const cloudsState = useFetch(() =>
    api.getCloudPlatforms().then(data => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, setPositionError);
      }
      return data;
    }),
  );

  const setPosition = (position: { coords: Coords }) => {
    setCoordsState(s => ({
      ...s,
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    }));
  };

  useEffect(() => {
    if (cloudsState.type === 'data' && !coordsState.error) {
      const distancesToClouds = calculateDistances(
        cloudsState.data.clouds,
        coordsState.coords,
      );
      setDistancesToClouds(distancesToClouds);
    }
  }, [coordsState, cloudsState]); // eslint-disable-line react-hooks/exhaustive-deps

  const coordsFetchInfo = {
    coordsFetched:
      coordsState.coords.latitude !== undefined &&
      coordsState.coords.longitude !== undefined,
    error: coordsState.error,
  };

  return {
    cloudsState,
    distancesToClouds,
    coordsFetchInfo,
  };
};
