function toDegrees(rads) {
  return 180 * rads / Math.PI;
};

function gradientToAngle(grad) {
  return toDegrees(Math.atan(grad));
};

function normalise(val, lower, upper) {
  if(val < lower) {
    return lower;
  } else if(val > upper) {
    return upper;
  } else {
    return val;
  }
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
    path.push(this.toCanvas(x,y,true));
    y -= stepx * f(x,y);
  }
  path.reverse();
  y = y0;
  for(var x = x0; x <= this.xmax; x += stepx) {
    path.push(this.toCanvas(x,y,true));
    y += stepx * f(x,y);
  }
  this.oo.drawPath({stroke: "#ff0000", path: path}).draw();
};

CoordSystem.prototype.drawGradientArrows = function(params){
  var f = require(params.f, "a gradient function");
  var xpoints = fallbackFor(params.xpoints, 20);
  var ypoints = fallbackFor(params.ypoints, 20);

  var self = this;

  function drawGradientArrow(f,x,y) {
    var grad = f(x,y);
    var angle = gradientToAngle(grad);
    var pos = self.toCanvas (x,y);
    self.oo.arrow({x:pos[0],y:pos[1],stroke:"#ff0000"}).rotate(angle).draw();
  }

  this.eachGridPoint(xpoints, ypoints, function(x,y) {
		       drawGradientArrow(f,x,y);
		     });
};


function eulerApproximation(params) {
  //Computes a euler approximation of the system of equations..
  // parameters:
  // - equations: an array of n functions each taking n+1 arguments
  //              i.e.: x' = f(t,x,y,z), y' = f(t,x,y,z), z' = f(t,x,y,z)
  // - startState: an array of n variables representing the initial state
  // - tmin, tmax, t0, step
  // returns:
  //  - a list of lists of the form [[t,x1,x2,x3,..]]

  var eqs = require(params.equations, "a system of equations");
  var startState = require(params.startState, "a starting state");
  var tmin = require(params.tmin, "a minimum 'time'");
  var tmax = require(params.tmax, "a maximum 'time'");
  var t0 = require(params.t0, "a start time");
  var step = fallbackFor(params.step, 0.01);

  var state = startState.slice();
  var results = [];


  for(var t = t0; t >= tmin; t -= step) {
    results.push([t, state.slice()]);
    var oldState = state.slice();
    var l = eqs.length;
    for(var i = 0; i < l; i++) {
      state[i] -= step * eqs[i].apply(this, oldState);
    }
  }

  results = results.slice(1); //to avoid duplicating t0
  results.reverse(); state = startState.slice();

  for(var t = t0; t <= tmax; t += step) {
    results.push([t, state.slice()]);
    var oldState = state.slice();
    var l = eqs.length;
    for(var i = 0; i < l; i++) {
      state[i] += step * eqs[i].apply(this, oldState);
    }
  };
  return results;
}