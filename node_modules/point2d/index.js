
/**
 * An immutable point in 2d space
 * @param {Number} x The x coordinate
 * @param {Number} y The y coordinate
 */
function Point (x, y) {
  this.x = x || 0;
  this.y = y || 0;
  Object.freeze(this);
}

/**
 * Returns the Euclidean distance between this point and another point
 * @param {Point} point The other point
 * @returns {Number} The Euclidean distance
 */
Point.prototype.distance = function (point) {
  return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
};

/**
 * Returns the Manhattan distance between this point and another point
 * @param {Point} point The other point
 * @returns {Number} The Manhattan distance
 */
Point.prototype.manhattanDistance = function (point) {
  var scalePoint = this.sub(point).abs();
  return scalePoint.x + scalePoint.y;
};

/**
 * Returns a new point with coordinates in absolute value
 * @returns {Point} The new point
 */
Point.prototype.abs = function () {
  return new Point(Math.abs(this.x), Math.abs(this.y));
};

/**
 * Returns true if the x and y coordinate of this point equals the x and y coordinate of the other point
 * @param {Point} point The other point
 * @returns {Boolean} If the points equal
 */
Point.prototype.equals = function (point) {
  return this.x === point.x && this.y === point.y;
};

/**
 * Returns a new point with the coordinates added together
 * @param {Point} point The other point
 * @returns {Point} A new point
 */
Point.prototype.add = function (point) {
  return new Point(this.x + point.x, this.y + point.y);
};

/**
 * Returns a new point with the coordinates of this point subtracted by the other point
 * @param {Point} point The other point
 * @returns {Point} The new point
 */
Point.prototype.sub = function (point) {
  return new Point(this.x - point.x, this.y - point.y);
};

module.exports = Point;