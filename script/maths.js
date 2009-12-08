function toDegrees(rads) {
  return 180 * rads / Math.PI;
};

function gradientToAngle(grad) {
  return toDegrees(Math.atan(grad));
};


CoordSystem.prototype.drawEulerApprox = function(steps,x0,y0,f) {
  var stepx = (this.xmax - this.xmin ) / steps;
  var y = y0;
  var path = [];
  for(var x = x0; x >= this.xmin; x -= stepx) {
    path.push(this.toCanvas(x,y));
    y -= stepx * f(x,y);
  }
  path.reverse();
  y = y0;
  for(var x = x0; x <= this.xmax; x += stepx) {
    path.push(this.toCanvas(x,y));
    y += stepx * f(x,y);
  }
  this.oo.drawPath({stroke: "#ff0000", path: path}).draw();
};