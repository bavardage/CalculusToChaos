function random_color() {
  var color = (0xffffff * Math.random()).toString(16);
  return "#" + color.replace(/\./i,"").slice(0,6);
};


$doodle.arrow = function(params) {
  var self = $doodle.sprite(params);

  self.stroke = (typeof self.stroke !== 'undefined') ? self.stroke : '#000000';
  self.direction = (typeof self.direction !== 'undefined') ? self.direction : 0;
  self.length = (typeof self.length !== 'undefined') ? self.length : 10;

  self.mold = function() {
    self.context.strokeStyle = self.stroke;
    self.context.beginPath();
    self.context.moveTo(0,0);
    self.context.lineTo(self.length,0);
    self.context.lineTo(self.length - 3,3);
    self.context.moveTo(self.length,0);
    self.context.lineTo(self.length - 3,-3);
    self.context.stroke();
  };
  self.rotate(self.direction);
  return self;
};

function toDegrees(rads) {
  return 180 * rads / Math.PI;
}

function gradientToAngle(grad) {
  return toDegrees(Math.atan(grad));
}

function CoordSystem(doodle,canvas,xmin,xmax,ymin,ymax) {
  this.oo = doodle;
  this.oo.canvas('#main-canvas').bgcolor('#000000');
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
  toCanvas : function(x,y) { //convert coord to canvas real position
    var cx = x * this.cw / this.xrange;
    var cy = y * this.ch / this.yrange;
    return [cx,cy];
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


// CoordSystem.prototype = {
//   toCanvas : function(x,y) {

//   },
//   doGrid : function(xpoints,ypoints,f) {
//     var xstep = (this.xmax - this.xmin) / xpoints;
//     var ystep = (this.ymax - this.ymin) / ypoints;
//     for(var x = this.xmin; x <= this.xmax; x += xstep)
//       for(var y = this.ymin; y <= this.ymax; y += ystep)
// 	f(x,y);
//   }
// };

// oo.canvas('#bleh')
//   oo.canvas().context.translate(200,200);
//   oo.canvas().context.transform(1.0,0,0,-1.0,0,0);