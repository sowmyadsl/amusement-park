var allrides = {
  'rollercoaster' : {
    'minheight': 36,
    'maxheight': 0
  },
  'whirling_teacups': {
    'minheight': 0,
    'maxheight': 55
  },
  'fun_house' : {
    'minheight': 0,
    'maxheight': 0,
  },
  'zero_gravity': {
    'minheight': 30,
    'maxheight': 45
  }
};

var heightCheck = function(ride, height) {
  var thisride = allrides[ride];
  var meets_min_height = (thisride.minheight === 0 || height > thisride.minheight);
  var meets_max_height = (thisride.maxheight === 0 || height < thisride.maxheight);
  return meets_min_height && meets_max_height;
};

$(document).ready(function() {
  $('form').submit(function(e) {
    e.preventDefault();
    var height = $('form input').val();
    //check all rides to see which ones they can ride
    var allowedRides = [];
    $.each(allrides, function(ride, requirements) {
      if (heightCheck(ride, height)) {
        allowedRides.push(ride);
      }
    });
    //highlight the rides
    $.each(allowedRides, function(index, value){
      $('.ride#' + value).addClass('rideable');
    });
  });
});
