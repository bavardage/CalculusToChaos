function fig41(oo) {
  $('#main-canvas').unbind("mousedown");
  var coords = new CoordSystem(oo, '#main-canvas', 0,5, -3,3);
  coords.drawAxis('#ffffff');

  var dxdt = function(t,x) {
    return (1+t)*x + 1 - 3*t + t*t;
  };

  coords.drawGradientArrows({f: dxdt});

  $('#main-canvas').mousedown(function(e) {
				//store mouse positions from jquery event
				var mouse_x = e.pageX - this.offsetLeft;
				var mouse_y = e.pageY - this.offsetTop;
				var p = coords.toCoord(mouse_x, mouse_y);
				coords.drawEulerApprox({f: dxdt,
							x0: p[0],
							y0: p[1],
							step: 0.002});
			      });
}

function fig45(oo) {
  $('#main-canvas').unbind("mousedown");
  var coords = new CoordSystem(oo, '#main-canvas',-1.0,9,-3,3);
  coords.drawAxis('#ffffff');

  var dxdt = function(t,x) {
    return t - x*x;
  };

  coords.drawGradientArrows({f:dxdt});

  $('#main-canvas').mousedown(function(e) {
				//store mouse positions from jquery event
				var mouse_x = e.pageX - this.offsetLeft;
				var mouse_y = e.pageY - this.offsetTop;
				var p = coords.toCoord(mouse_x, mouse_y);
				coords.drawEulerApprox({f: dxdt,
							x0: p[0],
							y0: p[1],
							step: 0.002});
			      });
};


function fig46(oo, step) { //show the breakdown of euler's method
  $('#main-canvas').unbind("click");

  var coords = new CoordSystem(oo, '#main-canvas', 0, 900, -60, 60);
  coords.drawAxis('#ffffff');

  var f = function(t,x) { return t - x*x; };

  coords.drawEulerApprox({f:f,
			  step:step});

};