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
  fp.map(feature => ({
    lat: feature.geometry.coordinates[1],
    lon: feature.geometry.coordinates[0],
    name: feature.properties.name,
  })),
  fp.get('features'),
  loadKML,
);

module.exports = { loadKML, loadPoints };
