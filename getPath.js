var PF = require('pathfinding');
var paths = require('./paths');

module.exports = function(start, end) {
  var grid = new PF.Grid(paths.matrix);
  var finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  });
  var gridBackup = grid.clone();
  var path = finder.findPath(paths.coords[parseInt(start)].x, paths.coords[parseInt(start)].x, paths.coords[parseInt(end)].x, paths.coords[parseInt(end)].y, grid);

  var waypointPath = [];

  path.forEach(elem => {
    waypointPath.push({
      x: elem[0]*100+100,
      y: elem[1]*100+150
    })
  });

  return waypointPath;
}
