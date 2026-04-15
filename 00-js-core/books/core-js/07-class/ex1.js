const Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};

// prototype method
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

// static method
Rectangle.isRectangle = function (instance) {
  return (
    instance instanceof Rectangle && instance.width > 0 && instance.height > 0
  );
};

const r = new Rectangle(10, 20);

console.log(r.getArea()); // 200
console.log(Rectangle.isRectangle(r)); // true
// console.log(r.isRectangle()); // TypeError
