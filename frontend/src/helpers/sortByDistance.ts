import { Cloud } from 'api/models';

export const sortByDistance = (
  data: Array<Cloud>,
  distancesToClouds: { [cloudName: string]: number },
  order: string,
): {
  sortedDistances: { [cloudName: string]: number };
  sortedData: Array<Cloud>;
} => {
  // Sort key:val distances first in distances object
  const sortedDistances = Object.fromEntries(
    Object.entries(distancesToClouds).sort(([, a], [, b]) =>
      order === 'asc' ? a - b : b - a,
    ),
  );

  // then sort rest of the data based on the order of keys in sortedDistances
  // key:val object
  const sortedData = data.sort((a, b) => {
    if (
      Object.keys(sortedDistances).indexOf(a.cloudName) >
      Object.keys(sortedDistances).indexOf(b.cloudName)
    ) {
      return 1;
    } else {
      return -1;
    }
  });

  return { sortedDistances, sortedData };
};
