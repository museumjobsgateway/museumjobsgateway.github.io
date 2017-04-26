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

var numAnim = new CountUp("count", 1000, 1700,0,1, options);
numAnim.start();



// var waypoint = new Waypoint({
//   element: document.getElementById('thing'),
//   handler: function() {
//     notify('Basic waypoint triggered')
//   }
// })

// var inview = new Waypoint.Inview({
//   element: document.getElementById('thing'),
//   enter: function(direction) {
//     console.log('Enter triggered with direction ' + direction)
//   },
//   entered: function(direction) {
//     console.log('Entered triggered with direction ' + direction)
//   },
//   exit: function(direction) {
//     console.log('Exit triggered with direction ' + direction)
//   },
//   exited: function(direction) {
//     console.log('Exited triggered with direction ' + direction)
//   }
// });

var museum = museum || {};

museum.init = (function() {
  var scrollButton = document.getElementById('scrollButton');
  var intro = document.getElementById('intro');

  function scrollTo() {
    scrollButton.addEventListener('click', function(e) {
      e.preventDefault();
      intro.scrollIntoView({block: "end", behavior: 'smooth'});
      //console.log('hello');
    });
  }
  return {
    scrollTo: scrollTo
  }
})();

museum.init.scrollTo();
