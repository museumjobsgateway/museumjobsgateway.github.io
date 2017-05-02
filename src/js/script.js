console.log('hello');



// var count = document.getQuerySelector('.count')
var stat1 = document.getElementById('stat1');
var stat1Heading = document.getElementById('stat1Heading').classList;
var stat1Box = document.getElementById('stat1Box').classList;

var stat2 = document.getElementById('stat2');
var stat2Heading = document.getElementById('stat2Heading').classList;
var stat2Box = document.getElementById('stat2Box').classList;

var stat3 = document.getElementById('stat3');
var stat3Heading = document.getElementById('stat3Heading').classList;
var stat3Box = document.getElementById('stat3Box').classList;

var stat4 = document.getElementById('stat4');
var stat4Heading = document.getElementById('stat4Heading').classList;
var stat4Box = document.getElementById('stat4Box').classList;


var easeOutCubic = function(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (1.77635683940025e-15 * tc * ts + 0.999999999999998 * tc + -3 * ts + 3 * t);
};
var options = {
  easingFn: easeOutCubic,
};

var duration = 2;

var upStat1 = new CountUp("stat1", 0, 1700, 0, duration, options);
var upStat2 = new CountUp("stat2", 0, 40, 0, duration, options);
var upStat3 = new CountUp("stat3", 0, 120, 0, duration, options);

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
  entered: function(direction) {
    jobClass.add('bounceIn');
  },
  exited: function(direction) {
    jobClass.remove('bounceIn');
  }
});


var inviewStat1 = new Waypoint.Inview({
  element: stat1,
  entered: function(direction) {
    upStat1.start();
    stat1Heading.add('reveal');
    stat1Box.add('move');
  },
  exited: function(direction) {
    upStat1.reset();
    stat1Heading.remove('reveal');
    stat1Box.remove('move');
  }
});

var inviewStat2 = new Waypoint.Inview({
  element: stat2,
  entered: function(direction) {
    upStat2.start();
    stat2Heading.add('reveal');
    stat2Box.add('move');
  },
  exited: function(direction) {
    upStat2.reset();
    stat2Heading.remove('reveal');
    stat2Box.remove('move');
  }
});

var inviewStat3 = new Waypoint.Inview({
  element: stat3,
  entered: function(direction) {
    upStat3.start();
    stat3Heading.add('reveal');
    stat3Box.add('move');
  },
  exited: function(direction) {
    upStat3.reset();
    stat3Heading.remove('reveal');
    stat3Box.remove('move');
  }
});

var inviewStat4 = new Waypoint.Inview({
  element: stat4,
  entered: function(direction) {
    stat4Heading.add('reveal');
    stat4Box.add('move');
  },
  exited: function(direction) {
    stat4Heading.remove('reveal');
    stat4Box.remove('move');
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
