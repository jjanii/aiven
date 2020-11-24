import React, { useState, useEffect } from "react";
import { Cloud } from "./api/models";
import Table from "./components/Table/Table";
import styled from "styled-components";
import Select from "./components/Select/Select";

import { usePlatforms } from "./helpers/usePlatforms";

const providerOptions = [
  { value: "", label: "All" },
  { value: "aws", label: "AWS" },
  { value: "azure", label: "Azure" },
  { value: "do", label: "Digital Ocean" },
  { value: "google", label: "Google Cloud" },
  { value: "upcloud", label: "UpCloud" }
];

const regionOptions = [
  { value: "", label: "All" },
  { value: "africa", label: "Africa" },
  { value: "australia", label: "Australia" },
  { value: "east asia", label: "East Asia" },
  { value: "europe", label: "Europe" },
  { value: "north america", label: "North America" },
  { value: "south america", label: "South America" },
  { value: "north asia", label: "North Asia" },
  { value: "south asia", label: "South Asia" },
  { value: "southeast asia", label: "Southeast Asia" }
];

const CloudGrid = () => {
  const platforms = usePlatforms();

  const [filteredPlatforms, setFilteredPlatforms] = useState<Array<Cloud>>(
    platforms
  );
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  useEffect(() => {
    const newFilteredPlatforms = platforms.filter(
      platform =>
        platform.cloudName.startsWith(selectedProvider) &&
        platform.geoRegion.includes(selectedRegion)
    );

    setFilteredPlatforms(newFilteredPlatforms);
  }, [selectedProvider, selectedRegion, platforms]);

  return (
    <Container>
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
      <Table data={filteredPlatforms} />
    </Container>
  );
};

const Container = styled.div`
  margin: 50px;
`;

export default CloudGrid;
