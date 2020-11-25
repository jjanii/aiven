import React from "react";
import CloudGrid from "./CloudGrid";
import { usePlatforms } from "./helpers/usePlatforms";

import "./App.css";
function App() {
  const { platforms, status, coordsFetched } = usePlatforms();

  return (
    <div className="App">
      {status === "loading" && <h1>Loading data</h1>}
      {status === "data" && (
        <CloudGrid platforms={platforms} coordsFetched={coordsFetched} />
      )}
      {status === "error" && (
        <h1>Error while fetching data, please try again.</h1>
      )}
    </div>
  );
}

export default App;
