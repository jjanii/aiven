import React from 'react';
import CloudGrid from 'components/CloudGrid';
import { usePlatforms } from 'hooks/usePlatforms';

import './App.css';

function App(): JSX.Element {
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
