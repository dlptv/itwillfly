const { createGPSObservable } = require('./util');

test('GPS module reads RMC data from port', (done) => {
  const gpsObservable = createGPSObservable();
  gpsObservable.subscribe((data) => {
    expect(data).toMatchSnapshot();
    done();
  });
});
