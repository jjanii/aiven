import React, { useEffect, useState } from "react";
import { CloudsApi } from "./api/index";
import "./App.css";
import { Cloud } from "./api/models";
import CloudGrid from "./CloudGrid";
import { calculateDistances } from "./helpers/location";

function App() {
  const [platforms, setPlatforms] = useState<Array<Cloud>>([]);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number }>(
    {
      latitude: 0,
      longitude: 0,
    },
  );

  const setPosition = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  useEffect(() => {
    const platformsWithDistances = calculateDistances(platforms, coords);
    setPlatforms(platformsWithDistances);
  }, [coords]);

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
