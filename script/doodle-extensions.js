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

$doodle.drawPath = function(params) {
  if(typeof params.path ==='undefined'){
    throw new SyntaxError("drawPath: requires path parameter."); }

  var self = $doodle.sprite(params);

  self.stroke = (typeof self.stroke !== 'undefined') ? self.stroke : '#000000';

  self.mold = function() {
    self.context.strokeStyle = self.stroke;
    self.context.beginPath();
    try {self.context.moveTo(self.path[0][0], self.path[0][1]);}catch(e){};
    self.path.slice(1).forEach(function(p) {
				 try {
				   self.context.lineTo(p[0], p[1]);
				 } catch(e) {};
			       });
    self.context.stroke();
  };

  return self;
};