import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { Cloud, CloudResponse } from 'api/models';
import Table from 'components/CloudTable/Table';
import Select from 'components/Select/Select';
import { SelectType } from 'components/Select/Select';
import { FetchState } from 'hooks/useFetch';

const providerOptions: Array<SelectType> = [
  { value: '', label: 'All' },
  { value: 'aws', label: 'AWS' },
  { value: 'azure', label: 'Azure' },
  { value: 'do', label: 'Digital Ocean' },
  { value: 'google', label: 'Google Cloud' },
  { value: 'upcloud', label: 'UpCloud' },
];

const regionOptions: Array<SelectType> = [
  { value: '', label: 'All' },
  { value: 'africa', label: 'Africa' },
  { value: 'australia', label: 'Australia' },
  { value: 'east asia', label: 'East Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'north america', label: 'North America' },
  { value: 'south america', label: 'South America' },
  { value: 'south asia', label: 'South Asia' },
  { value: 'southeast asia', label: 'Southeast Asia' },
];

const CloudGrid = (props: {
  cloudsState: FetchState<CloudResponse, Error>;
  distancesToClouds: { [cloudName: string]: number };
  coordsFetchInfo: { coordsFetched: boolean; error: boolean };
}) => {
  const { cloudsState, distancesToClouds, coordsFetchInfo } = props;

  const [filteredPlatforms, setFilteredPlatforms] = useState<Array<Cloud>>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  useEffect(() => {
    if (cloudsState.type === 'data') {
      setFilteredPlatforms(cloudsState.data.clouds);
    }
  }, [cloudsState]);

  useEffect(() => {
    if (cloudsState.type === 'data') {
      const newFilteredPlatforms = cloudsState.data.clouds.filter(
        platform =>
          platform.cloudName.startsWith(selectedProvider) &&
          platform.geoRegion.startsWith(selectedRegion),
      );

      setFilteredPlatforms(newFilteredPlatforms);
    }
  }, [selectedProvider, selectedRegion, cloudsState]);

  return (
    <div style={{ margin: '50px' }}>
      <Select
        title="Select Provider"
        options={providerOptions}
        onSelect={setSelectedProvider}
        selected={selectedProvider}
      />
      <Select
        title="Select Region"
        options={regionOptions}
        onSelect={setSelectedRegion}
        selected={selectedRegion}
      />
      {cloudsState.type !== 'loading' &&
        !coordsFetchInfo.coordsFetched &&
        !coordsFetchInfo.error && (
          <p>
            We are still getting your geo coordinates, meanwhile distances are
            calculated from Kamppi, Helsinki. Distances will update
            automatically once the coordinates are ready.
          </p>
        )}
      {cloudsState.type !== 'loading' && coordsFetchInfo.error && (
        <p style={{ color: 'red' }}>
          Error while trying to fetch your geo coordinates, did you accidentally
          deny accesss for browser location info? Defaulting distances from
          Kamppi, Helsinki, Finland.
        </p>
      )}
      {cloudsState.type === 'loading' && (
        <Spinner animation="border" style={{ width: '5rem', height: '5rem' }} />
      )}
      {cloudsState.type === 'data' && (
        <Table data={filteredPlatforms} distancesToClouds={distancesToClouds} />
      )}
      {cloudsState.type === 'error' && (
        <p style={{ color: 'red' }}>{cloudsState.error}</p>
      )}
    </div>
  );
};

export default CloudGrid;
