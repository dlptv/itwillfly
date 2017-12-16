const SerialPort = require('serialport');
const GPS = require('./src/gps');

const PORT_PATH = 'dev/ttyUSB3';
const BAUD_RATE = 115200;

const port = new SerialPort(PORT_PATH, { baudRate: BAUD_RATE });

GPS.createListener(port, (data) => {
  console.log(data);
});
