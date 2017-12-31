const SerialPort = require('serialport');
const vincenty = require('node-vincenty');
const _ = require('lodash');
const prettyjson = require('prettyjson');

const GPS = require('./src/gps');
const kml = require('./src/kml');

const PORT_PATH = '/dev/ttyUSB3';
const BAUD_RATE = 4800;

const points = kml.loadPoints('./tests/data/TestMap.kml');
points[0].current = true;

const port = new SerialPort(PORT_PATH, { baudRate: BAUD_RATE });

const gpsObservable = GPS.createObservable(port)
  .map(p => ({ source: { lat: p.lat, lon: p.lon } }))
  .map(s => (_.merge(s, { dest: _.find(points, p => p.current) })))
  .map(r => _.merge(r, {
    dist: vincenty.distVincenty(r.source.lat, r.source.lon, r.dest.lat, r.dest.lon),
  }));

gpsObservable.subscribe((data) => {
  console.log(prettyjson.render(data));
});
