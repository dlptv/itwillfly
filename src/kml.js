const tj = require('@mapbox/togeojson');
const fp = require('lodash/fp');
const fs = require('fs');
const { DOMParser } = require('xmldom');

const loadKML = (path) => {
  const kml = new DOMParser().parseFromString(fs.readFileSync(path, 'utf8'));

  return tj.kml(kml);
};

const loadPoints = fp.compose(
  fp.map(feature => ({ coordinates: feature.geometry.coordinates, name: feature.properties.name })),
  fp.get('features'),
  loadKML,
);

module.exports = { loadKML, loadPoints };
