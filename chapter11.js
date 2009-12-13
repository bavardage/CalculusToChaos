function lorenz(oo) {
  $('#main-canvas').unbind("click");

  var tmax = 20;

  var coords = new CoordSystem(oo, '#main-canvas', -30,30, 0,50);
  coords.drawAxis('#ffffff');

  var eqs = [function(t,x,y,z) {
	       return 10*(y-x);
	     },
	     function(t,x,y,z) {
	       return 28*x - y - z*x;
	     },
	     function(t,x,y,z) {
	       return -8*z/3 + x*y;
	     }];

  var startState = [5,5,5];

  var results = eulerApproximation({equations: eqs,
				    startState: startState,
				    t0: 0, tmin: 0, tmax: tmax,
				    step: 0.001});
  var path = [];
  results.forEach(function(e) {
		    path.push(coords.toCanvas(e[1][0], e[1][2])); //x-z plane
		  });
  coords.oo.drawPath({stroke: '#ff0000', path: path}).draw();

}
