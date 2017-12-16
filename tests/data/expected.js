const map = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [6.01845045999994, 59.04661153, 0] },
    properties: {
      name: '1', styleUrl: '#icon-1899-0288D1-nodesc', styleHash: '-68688fa4', styleMapHash: { normal: '#icon-1899-0288D1-nodesc-normal', highlight: '#icon-1899-0288D1-nodesc-highlight' },
    },
  }, {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [6.30284634999998, 59.08882076, 0] },
    properties: {
      name: '2', styleUrl: '#icon-1899-0288D1-nodesc', styleHash: '-68688fa4', styleMapHash: { normal: '#icon-1899-0288D1-nodesc-normal', highlight: '#icon-1899-0288D1-nodesc-highlight' },
    },
  }, {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [6.57871367000007, 59.06561761, 0] },
    properties: {
      name: '3', styleUrl: '#icon-1899-0288D1-nodesc', styleHash: '-68688fa4', styleMapHash: { normal: '#icon-1899-0288D1-nodesc-normal', highlight: '#icon-1899-0288D1-nodesc-highlight' },
    },
  }, {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [6.50055946999998, 59.14423978, 0] },
    properties: {
      name: 'finish', styleUrl: '#icon-1899-0288D1-nodesc', styleHash: '-68688fa4', styleMapHash: { normal: '#icon-1899-0288D1-nodesc-normal', highlight: '#icon-1899-0288D1-nodesc-highlight' },
    },
  }],
};

const mapPoints = [
  { coordinates: [6.01845045999994, 59.04661153, 0], name: '1' },
  { coordinates: [6.30284634999998, 59.08882076, 0], name: '2' },
  { coordinates: [6.57871367000007, 59.06561761, 0], name: '3' },
  { coordinates: [6.50055946999998, 59.14423978, 0], name: 'finish' },
];

module.exports = { map, mapPoints };
