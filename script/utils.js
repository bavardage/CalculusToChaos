function randomColor() {
  var color = (0xffffff * Math.random()).toString(16);
  return "#" + color.replace(/\./i,"").slice(0,6);
};

function fallbackFor(arg, fallback) {
  return (typeof arg !== 'undefined') ? arg : fallback;
}

function require(arg, name) {
  if(typeof arg === 'undefined') {
    var fn = functionName(arguments.callee.caller);
    throw new SyntaxError(name + " is required in " + fn);
  } else {
    return arg;
  }
}

function functionName(fn) {
  var name=/\W*function\s+([\w\$]+)\(/.exec(fn);
  if(!name) return 'anonymous function: ' + fn.toString();
  return name[1];
}