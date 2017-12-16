const SerialPort = require('serialport/test');

const { Binding: MockBinding } = SerialPort;

// needed to mock SerialPort
// eslint-disable-next-line global-require
jest.mock('serialport', () => require('serialport/test'));

const GPS = require('../../src/gps');

const portPath = '/dev/ttyTest';

test('GPS module reads RMC data from port', (done) => {
  MockBinding.createPort(portPath, { echo: false, record: false });
  const port = new SerialPort(portPath, { baudRate: 115200 });

  const gpsObservable = GPS.createObservable(port);
  gpsObservable.subscribe((data) => {
    const expectedData = {
      time: new Date('2017-12-12T18:23:25.921Z'), lat: 59.05983333333333, lon: 5.933033333333333, speed: 35.9288, track: 127.8,
    };
    expect(data).toMatchObject(expectedData);
    done();
  });

  port.on('open', () => {
    port.binding.emitData(Buffer.from('$GPRMC,182325.921,A,5903.590,N,00555.982,E,019.4,127.8,121217,000.0,W*7C\n'));
  });
});
