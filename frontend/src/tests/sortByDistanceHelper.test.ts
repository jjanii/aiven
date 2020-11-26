import { sortByDistance } from 'helpers/sortByDistance';
import { clouds } from './locationhelper.test.ts';

const distances = {
  'aws-af-south-1': 10479,
  'azure-south-africa-north': 9607,
  'aws-me-south-1': 4265,
};

describe('Sort by distance', () => {
  test('Sorts data correctly when order is ascending', () => {
    const { sortedDistances, sortedData } = sortByDistance(
      clouds,
      distances,
      'asc',
    );

    const sortedDistanceValues = Object.values(sortedDistances);
    const sortedDistanceNames = Object.keys(sortedDistances);

    expect(sortedDistanceValues[0]).toBeLessThan(sortedDistanceValues[1]);
    expect(sortedDistanceValues[1]).toBeLessThan(sortedDistanceValues[2]);

    expect(sortedDistanceNames[0]).toEqual(sortedData[0].cloudName);
    expect(sortedDistanceNames[1]).toEqual(sortedData[1].cloudName);
    expect(sortedDistanceNames[2]).toEqual(sortedData[2].cloudName);
  });

  test('Sorts data correctly when order is descending', () => {
    const { sortedDistances, sortedData } = sortByDistance(
      clouds,
      distances,
      'desc',
    );

    const sortedDistanceValues = Object.values(sortedDistances);
    const sortedDistanceNames = Object.keys(sortedDistances);

    expect(sortedDistanceValues[0]).toBeGreaterThan(sortedDistanceValues[1]);
    expect(sortedDistanceValues[1]).toBeGreaterThan(sortedDistanceValues[2]);

    expect(sortedDistanceNames[0]).toEqual(sortedData[0].cloudName);
    expect(sortedDistanceNames[1]).toEqual(sortedData[1].cloudName);
    expect(sortedDistanceNames[2]).toEqual(sortedData[2].cloudName);
  });
});
