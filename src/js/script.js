console.log('hello');


//var count = document.getQuerySelector('.count')

var numAnim = new CountUp("count", 1000, 1700,0,1);
numAnim.start();



// var waypoint = new Waypoint({
//   element: document.getElementById('jobhook'),
//   handler: function() {
//     console.log('Im in view!');
//   }
// })

var jobElem = document.getElementById('jobhook');
var jobClass = jobElem.classList;

var inview = new Waypoint.Inview({
  element: jobElem,
  enter: function(direction) {
    console.log('Enter triggered with direction ' + direction)
  },
  entered: function(direction) {
    console.log('Entered triggered with direction ' + direction)
    jobClass.add('bounceIn');
  },
  exit: function(direction) {
    console.log('Exit triggered with direction ' + direction)
  },
  exited: function(direction) {
    console.log('Exited triggered with direction ' + direction)
    jobClass.remove('bounceIn');
  }
});

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
