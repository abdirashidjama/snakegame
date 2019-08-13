# point2d

A point in 2d space

```sh
npm install point2d --save
```

## Example

```js
var Point = require('point2d');

var point1 = new Point(1, 2);
console.log(point1.x); // 1
console.log(point1.y); // 2

var point2 = new Point(); // (0, 0)

console.log(new Point().distance(new Point())); // 5

console.log(new Point().manhattanDistance(new Point())); // 7

console.log(new Point(-3, 4).abs()); // (3, 4)

console.log(new Point(1, 2).equals(new Point(1, 2))); // true

console.log(new Point(1, 2).add(new Point(2, 3))); // (3, 5)

console.log(new Point(1, 2).sub(new Point(1, 1))); // (0, 1)
```

## Methods

### Point.distance(point2d)
Returns the Euclidean distance between this point and another point

### Point.manhattanDistance(point2d)
Returns the Manhattan distance between this point and another point

### Point.abs()
Returns a new point with coordinates in absolute value

### Point.equals(point2d)
Returns true if the x and y coordinate of this point equals the x and y coordinate of the other point

### Point.add(point2d)
Returns a new point with the coordinates added together

### Point.sub(point2d)
Returns a new point with the coordinates of this point subtracted by the other point