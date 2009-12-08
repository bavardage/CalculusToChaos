function toDegrees(rads) {
  return 180 * rads / Math.PI;
};

function gradientToAngle(grad) {
  return toDegrees(Math.atan(grad));
};


CoordSystem.prototype.drawEulerApprox = function(params) {
  var x0 = fallbackFor(params.x0, 0); var y0 = fallbackFor(params.y0, 0);
  var f = require(params.f, "a gradient function");
  if(typeof params.steps !== 'undefined')
    var stepx = (this.xmax - this.xmin ) / steps;
  else if (typeof params.step !== 'undefined') {
    var stepx = params.step;
  } else {
    var stepx = 0.01; //'sane default'
  }
  
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