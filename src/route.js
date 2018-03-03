const vincenty = require('node-vincenty');

function createMission(points) {
  return {
    points,
    nextIndex: 0,
    arrived: false,
    get current() { return points[this.nextIndex]; },
    get hasNext() { return this.nextIndex < points.length - 1; },
  };
}

function isPointChanged(currentLocation, mission) {
  const { distance } = vincenty.distVincenty(
    currentLocation.lat, currentLocation.lon,
    mission.current.lat, mission.current.lon,
  );

  return distance <= 10;
}

function switchPoint({ mission }) {
  const nextIndex = mission.nextIndex < mission.points.length ?
    mission.nextIndex + 1 : mission.nextIndex;
  return Object.assign({}, mission, { nextIndex });
}

function isDestinationReached(mission) {
  return !mission.hasNext;
}

function createRouteObservable(points, gpsObservable) {
  const mission = createMission(points);
  return gpsObservable
    .filter((data) => {
      if (!mission.arrived && isPointChanged(data, mission)) {
        if (!mission.hasNext) { mission.arrived = true; }
        mission.nextIndex += 1;
        return true;
      }
      return false;
    })
    .map(data => ({ currentLocation: data, mission }));
}

module.exports = {
  createMission,
  switchPoint,
  isDestinationReached,
  createRouteObservable,
};
