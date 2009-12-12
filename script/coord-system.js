function CoordSystem(doodle,canvas,xmin,xmax,ymin,ymax) {
  this.oo = doodle;
  this.oo.canvas('#main-canvas').bgcolor('#000000');
  this.oo.canvas().context.setTransform(1, 0, 0, 1, 0, 0); //identity
  this.oo.canvas().clear();
  //cw means canvas width, ch canvas height..
  this.cw = this.oo.canvas().width; this.ch = this.oo.canvas().height;
  this.xmin = xmin; this.xmax = xmax; this.xrange = xmax - xmin;
  this.ymin = ymin; this.ymax = ymax; this.yrange = ymax - ymin;

  //where is the origin in real coordinates?
  var x0 = (0 - this.xmin) * this.cw / this.xrange;
  var y0 = (0 - this.ymin) * this.ch / this.yrange;
  this.oo.canvas().context.translate(0,this.ch);
  this.oo.canvas().context.transform(1.0,0,0,-1,0,0);
  this.oo.canvas().context.translate(x0,y0);
}

CoordSystem.prototype = {
  toCanvas : function(x,y, norm) { //convert coord to the coordinate to draw on
    // this takes into account the transformed canvas
    if(norm) {
      x = normalise(x, this.xmin, this.xmax);
      y = normalise(y, this.ymin, this.ymax);
    };

    var cx = x * this.cw / this.xrange;
    var cy = y * this.ch / this.yrange;
    return [cx,cy];
  },
  toCoord : function(cx,cy) {
    var x = cx * this.xrange / this.cw + this.xmin;
    var y = this.ymax - cy * this.yrange / this.ch;
    return [x,y];
  },
  drawAxis : function(stroke) {
    lengths = this.toCanvas(this.xrange, this.yrange);
    pos = this.toCanvas(this.xmin, this.ymin);
    this.oo.arrow({x:pos[0], y:0,
		   length:lengths[0],
		   stroke:stroke}).draw();
    this.oo.arrow({x:0,y:pos[1],
		   length:lengths[1],
		   stroke:stroke}).rotate(90).draw();
  },
  eachGridPoint : function(nx,ny,f) { //call f with each point in the nx*ny grid
    var stepx = this.xrange / nx; var stepy = this.yrange / ny;
    for(var x = this.xmin; x <= this.xmax; x += stepx)
      for(var y = this.ymin; y <= this.ymax; y += stepy)
	f(x,y);
  }
};