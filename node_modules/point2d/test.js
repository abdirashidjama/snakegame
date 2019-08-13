
var assert = require("assert");
var Point = require('./');
describe('point', function () {
  describe('constructor', function () {
    it('should accept coordiantes', function () {
      var point = new Point(1, 2);
      assert.equal(point.x, 1);
      assert.equal(point.y, 2);
    });

    it('should create unique points', function () {
      var point1 = new Point(1, 2);
      var point2 = new Point(3, 4);
      assert.equal(point1.x, 1);
      assert.equal(point1.y, 2);
      assert.equal(point2.x, 3);
      assert.equal(point2.y, 4);
    });

    it('should default to 0, 0', function () {
      var point = new Point();
      assert.equal(point.x, 0);
      assert.equal(point.y, 0);
    });
  });

  describe('distance', function () {
    it('should be 0 when calculating the distance to the same point', function () {
      assert.equal(new Point().distance(new Point()), 0);
    });

    it('should be accurate', function () {
      assert.equal(new Point().distance(new Point(3, 4)), 5);
    });
  });

  describe('manhattanDistance', function() {
    it('should work', function () {
      assert.equal(new Point(-3, -4).manhattanDistance(new Point(3, 4)), 14);
    });
  });

  describe('abs', function() {
    it('should work with positive coordinates', function () {
      assert(new Point(1, 2).abs().equals(new Point(1, 2)));
    });

    it('shoudl work with negative coordinates', function () {
      assert(new Point(-1, -2).abs().equals(new Point(1, 2)));
    });
  });

  describe('equals', function () {
    it('should equal itself', function () {
      assert(new Point().equals(new Point()));
    });

    it('should not equal other points', function () {
      assert(!new Point().equals(new Point(1, 2)));
    });
  });

  describe('add', function () {
    it('should add correctly', function () {
      assert(new Point(1, 2).add(new Point(3, 4)).equals(new Point(4, 6)));
    });
  });

  describe('sub', function () {
    it('should subtract correctly', function () {
      assert(new Point(1, 2).sub(new Point(3, 4)).equals(new Point(-2, -2)));
    });
  });
});