import React from 'react';
import CloudGrid from 'components/CloudGrid';
import { usePlatforms } from 'helpers/usePlatforms';

import './App.css';

function App() {
  const { cloudsState, distancesToClouds, coordsFetchInfo } = usePlatforms();

  return (
    <div className="App">
      <CloudGrid
        cloudsState={cloudsState}
        distancesToClouds={distancesToClouds}
        coordsFetchInfo={coordsFetchInfo}
      />
    </div>
  );
}

export default App;
