import { useState, useEffect } from 'react';
import { useFetch } from 'hooks/useFetch';
import { Coords, calculateDistances } from 'helpers/location';
import { CloudsApi } from 'api/index';
import { FetchState } from 'hooks/useFetch';
import { CloudResponse } from 'api/models';

type DistanceToCloudMap = {
  [cloudName: string]: number;
};

export type CoordsFetchInfo = {
  coordsFetched: boolean;
  error?: boolean;
  errorMsg?: string;
};

type UsePlatFormsType = {
  cloudsState: FetchState<CloudResponse, Error>;
  distancesToClouds: DistanceToCloudMap;
  coordsFetchInfo: CoordsFetchInfo;
};

const api = new CloudsApi();

export const usePlatforms = (): UsePlatFormsType => {
  const [distancesToClouds, setDistancesToClouds] = useState<{
    [cloudName: string]: number;
  }>({});
  const [coordsState, setCoordsState] = useState<{
    coords: { latitude: number | undefined; longitude: number | undefined };
    error: boolean;
    errorMsg?: string;
  }>({
    coords: { latitude: undefined, longitude: undefined },
    error: false,
    errorMsg: undefined,
  });

  const setPositionError = (e: GeolocationPositionError) => {
    setCoordsState(s => ({ ...s, error: true, errorMsg: e.message }));
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
  }, [coordsState, cloudsState]);

  const coordsFetchInfo: {
    coordsFetched: boolean;
    error?: boolean;
    errorMsg?: string;
  } = {
    coordsFetched:
      coordsState.coords.latitude !== undefined &&
      coordsState.coords.longitude !== undefined,
    error: coordsState.error,
    errorMsg: coordsState.errorMsg,
  };

  return {
    cloudsState,
    distancesToClouds,
    coordsFetchInfo,
  };
};
