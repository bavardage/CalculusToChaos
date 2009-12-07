function test(oo) {

  coords = new CoordSystem(oo, '#main-canvas',0,5,-3,3);
  coords.drawAxis('#ffffff');

  gradFunction = function(t,x) {
    return (1+t)*x + 1 - 3*t + t*t;
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
}