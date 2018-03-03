const SerialPort = require('serialport/test');
const readline = require('readline');
const fs = require('fs');

const { Binding: MockBinding } = SerialPort;

// needed to mock SerialPort
// eslint-disable-next-line global-require
jest.mock('serialport', () => require('serialport/test'));

const GPS = require('../../src/gps');

const portPath = '/dev/ttyTest';

function createGPSObservable() {
  MockBinding.createPort(portPath, { echo: false, record: false });
  const port = new SerialPort(portPath, { baudRate: 115200 });
  const rl = readline.createInterface({
    input: fs.createReadStream(`${process.cwd()}/tests/data/testdata.nmea`),
  });

  port.on('open', () => {
    rl.on('line', (line) => {
      port.binding.emitData(Buffer.from(`${line}\n`));
    });
  });

  return GPS.createObservable(port);
}

module.exports = {
  createGPSObservable,
};
