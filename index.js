const SerialPort = require('serialport');
const GPS = require('gps');

const { parsers } = SerialPort;

const port = new SerialPort('/dev/ttyUSB3', {
  baudRate: 115200,
});

const parser = new parsers.Readline({
  delimiter: '\n',
});

port.pipe(parser);


const gps = new GPS();

parser.on('data', (data) => {
  gps.update(data);
});

gps.on('data', () => {
  console.log(gps.state);
});
