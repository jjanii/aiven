import React, { useEffect, useState } from "react";
import { CloudsApi } from "./api/index";
import logo from "./logo.svg";
import "./App.css";
import { Cloud } from "./api/models";
import CloudGrid from "./CloudGrid";
function App() {
  const [allPlatforms, setAllPlatforms] = useState<Array<Cloud>>([]);

  useEffect(() => {
    const api = new CloudsApi();
    api.getCloudPlatforms().then(data => setAllPlatforms(data.clouds));
  }, []);

  return (
    <div className="App">
      <CloudGrid platforms={allPlatforms} />
    </div>
  );
}

export default App;
