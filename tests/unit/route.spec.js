const path = require('path');
const vincenty = require('node-vincenty');

const route = require('../../src/route');
const kml = require('../../src/kml');

const { createGPSObservable } = require('./util');

test('get changing point locations only', (done) => {
  const points = kml.loadPoints(path.join(process.cwd(), 'tests/data/TestMap.kml'));
  const eventCounter = jest.fn();
  route.createRouteObservable(points, createGPSObservable())
    .subscribe(({ currentLocation, mission }) => {
      const { distance } = vincenty.distVincenty(
        currentLocation.lat, currentLocation.lon,
        points[mission.nextIndex - 1].lat, points[mission.nextIndex - 1].lon,
      );
      expect(distance).toBeLessThan(10);
      eventCounter();
      if (mission.arrived) {
        expect(eventCounter.mock.calls).toHaveLength(4);
        done();
      }
    });
});

