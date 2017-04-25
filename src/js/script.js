console.log('hello');


var easeOutCubic = function(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (1.77635683940025e-15 * tc * ts + 0.999999999999998 * tc + -3 * ts + 3 * t);
};
var options = {
  easingFn: easeOutCubic
};

//var count = document.getQuerySelector('.count')

var numAnim = new CountUp("count", 0, 21,0,3, options);
numAnim.start();



var waypoint = new Waypoint({
  element: document.getElementById('thing'),
  handler: function() {
    notify('Basic waypoint triggered')
  }
})

var inview = new Waypoint.Inview({
  element: document.getElementById('thing'),
  enter: function(direction) {
    console.log('Enter triggered with direction ' + direction)
  },
  entered: function(direction) {
    console.log('Entered triggered with direction ' + direction)
  },
  exit: function(direction) {
    console.log('Exit triggered with direction ' + direction)
  },
  exited: function(direction) {
    console.log('Exited triggered with direction ' + direction)
  }
})
