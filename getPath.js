module.exports = function() {
  var grid = new PF.Grid(matrix);
  var finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  });
  var gridBackup = grid.clone();
  var path = finder.findPath(1, 8, 12, 1, grid);

  var waypointPath = [];

  path.forEach(elem => {
    waypointPath.push({
      x: elem[0]*100+100,
      y: elem[1]*100+150
    })
  });

  waypointPath.push({
    wait: true,
    fruit: 'banana'
  });
  return waypointPath;
}
