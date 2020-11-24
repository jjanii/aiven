import React, { useEffect, useState } from "react";
import { CloudsApi } from "./api/index";
import "./App.css";
import { Cloud } from "./api/models";
import CloudGrid from "./CloudGrid";
import { calculateDistances } from "./helpers/location";

function App() {
  const [platforms, setPlatforms] = useState<Array<Cloud>>([]);
  let coords: { latitude: number; longitude: number } = {
    latitude: 0,
    longitude: 0
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      });
    } else {
      alert(
        "It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it."
      );
    }

    const api = new CloudsApi();
    api.getCloudPlatforms().then(data => {
      const platformsWithDistances = calculateDistances(data.clouds, coords);
      setPlatforms(platformsWithDistances);
    });
  }, []);

  return (
    <div className="App">
      <CloudGrid platforms={platforms} />
    </div>
  );
}

export default App;
