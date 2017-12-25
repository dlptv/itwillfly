const SerialPort = require('serialport');
const GPS = require('gps');
const Rx = require('rxjs/Rx');

const createParser = () => new SerialPort.parsers.Readline({
  delimiter: '\n',
});

const createObservable = (port) => {
  const parser = createParser();
  port.pipe(parser);

  return Rx.Observable.fromEvent(parser, 'data')
    .filter(data => data.startsWith('$GPRMC'))
    .map(data => GPS.Parse(data));
};

module.exports = { createObservable };
