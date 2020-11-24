import React, { useEffect, useState } from "react";
import { CloudsApi } from "./api/index";
import CloudGrid from "./CloudGrid";

import "./App.css";

import { calculateDistances } from "./helpers/location";

import { Cloud } from "./api/models";
import type { Coords } from "./helpers/location";

function App() {
  const [platforms, setPlatforms] = useState<Array<Cloud>>([]);
  const [coords, setCoords] = useState<Coords>({
    latitude: 0,
    longitude: 0,
  });

  const setPosition = (position: { coords: Coords }) => {
    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  useEffect(() => {
    const platformsWithDistances = calculateDistances(platforms, coords);
    setPlatforms(platformsWithDistances);
  }, [coords]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const api = new CloudsApi();
    api
      .getCloudPlatforms()
      .then((data) => {
        setPlatforms(data.clouds);
      })
      .then(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(setPosition, console.log);
        } // handle case where geolocation is disabled
      });
  }, []);

  return (
    <div className="App">
      <CloudGrid platforms={platforms} />
    </div>
  );
}

export default App;
