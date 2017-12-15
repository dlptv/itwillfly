const SerialPort = require('serialport');
const GPS = require('gps');

const createParser = () => new SerialPort.parsers.Readline({
  delimiter: '\n',
});

const linkPortWithParser = (port, parser) => port.pipe(parser);

const createGPS = () => new GPS();
const linkGpsWithParser = (gps, port) => {
  port.on('data', (data) => {
    if (data.startsWith('$GPRMC')) {
      gps.update(data);
    }
  });
};

const getState = gps => gps.state;

const createListener = (port, eventListener) => {
  const parser = createParser();
  linkPortWithParser(port, parser);

  const gps = createGPS();
  linkGpsWithParser(gps, parser);

  gps.on('data', () => eventListener(getState(gps)));
};

module.exports = { createListener };
