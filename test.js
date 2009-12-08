function test(oo) {

  coords = new CoordSystem(oo, '#main-canvas',-1.0,9,-3,3);
  coords.drawAxis('#ffffff');

  //gradFunction = function(t,x) {
  //  return (1+t)*x + 1 - 3*t + t*t;
  //};
  gradFunction = function(t,x) {
    return t - x*x;
  };


  function drawGradientArrow(f,x,y) {
    var grad = f(x,y);
    var angle = gradientToAngle(grad);
    pos = coords.toCanvas (x,y);
    oo.arrow({x:pos[0],y:pos[1],stroke:"#ff0000"}).rotate(angle).draw();
  }

  coords.eachGridPoint(20,20,function(x,y) {
			 drawGradientArrow(gradFunction,x,y);
		       });


  $('#main-canvas').mousedown(function(e) {
				//store mouse positions from jquery event
				var mouse_x = e.pageX - this.offsetLeft;
				var mouse_y = e.pageY - this.offsetTop;
				var p = coords.toCoord(mouse_x, mouse_y);
				coords.drawEulerApprox(100, p[0], p[1],
						       gradFunction);
			      });
};
