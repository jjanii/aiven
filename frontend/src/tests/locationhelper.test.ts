import { calculateDistances } from 'helpers/location';
export const clouds = [
  {
    cloudDescription: 'Africa, South Africa - Amazon Web Services: Cape Town',
    cloudName: 'aws-af-south-1',
    geoLatitude: -33.92,
    geoLongitude: 18.42,
    geoRegion: 'africa',
  },
  {
    cloudDescription: 'Asia, Bahrain - Amazon Web Services: Bahrain',
    cloudName: 'aws-me-south-1',
    geoLatitude: 26.07,
    geoLongitude: 50.55,
    geoRegion: 'south asia',
  },
  {
    cloudDescription: 'Africa, South Africa - Azure: South Africa North',
    cloudName: 'azure-south-africa-north',
    geoLatitude: -26.198,
    geoLongitude: 28.03,
    geoRegion: 'africa',
  },
];

const coords = { latitude: 60.168415993, longitude: 24.9333962664 };
const result = calculateDistances(clouds, coords);

describe('Location helper', () => {
  test('Results as value being NaN if coords are not numbers', () => {
    const result = calculateDistances(clouds, {
      latitude: 'asd',
      longitude: true,
    });

    Object.entries(result).forEach((entry, i) => expect(entry[1]).toEqual(NaN));
  });

  test('Returns key:val pairs of cloud names and distances for each input', () => {
    expect(Object.entries(result).length).toEqual(clouds.length);
  });

  test('results have the cloud name as key and distance as value', () => {
    expect(Object.entries(result).length).toEqual(clouds.length);

    Object.entries(result).forEach((entry, i) =>
      expect(entry[0]).toEqual(clouds[i].cloudName),
    );

    Object.entries(result).forEach(entry =>
      expect(typeof entry[1]).toBe('number'),
    );
  });
});
