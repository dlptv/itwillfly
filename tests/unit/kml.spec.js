const path = require('path');
const kml = require('../../src/kml');
const { map: expectedMap, mapPoints: expectedMapPoints } = require('../data/expected');

test('KML parser should read file and return correct geoJSON', () => {
  const converted = kml.loadKML(path.join(process.cwd(), 'tests/data/TestMap.kml'));

  expect(converted).toMatchObject(expectedMap);
});

test('KML parser should read file and return list of points', () => {
  const points = kml.loadPoints(path.join(process.cwd(), 'tests/data/TestMap.kml'));
  expect(points).toEqual(expect.arrayContaining(expectedMapPoints));
});

