function random_color() {
  var color = (0xffffff * Math.random()).toString(16);
  return "#" + color.replace(/\./i,"").slice(0,6);
};