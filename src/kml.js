const tj = require('@mapbox/togeojson');
const fp = require('lodash/fp');
const fs = require('fs');
const { DOMParser } = require('xmldom');

const loadKML = path => fp.compose(
  tj.kml,
  file => new DOMParser().parseFromString(file),
  fs.readFileSync,
)(path, 'utf8');

const loadPoints = fp.compose(
  fp.map(feature => ({ coordinates: feature.geometry.coordinates, name: feature.properties.name })),
  fp.get('features'),
  loadKML,
);

module.exports = { loadKML, loadPoints };
