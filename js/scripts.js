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

$(document).ready(function() {

  /*
  functions should not depend on things outside themselves, so we pass in everything we'll need
  In this case, it's getting the height as an integer, and the above object
  */
  var getAllowedRides = function(height, rides) {
    /*
    the callback function that we give to $.map gets the arguments element, index
    this is because a lot of the time you don't care about the index
    so in those cases you can write 
      $.map(object, function(element) { //do something with element})
    and ignore that the second argument exists
    */
    return $.map(rides, function(requirements, ridename) {
      if (heightCheck(requirements, height)) {
        return ridename;
      }
    });
  };


  /*
  Again, the function is passed the arguments it needs.
  Functions should be 'atomic', complete in themselves and with no side effects.
  Pseudocode for this would be something like 
    if (height is above minimum AND (height below max OR requirements === NO_MAX_HEIGHT)) 
      return true
    else return false
  In other languages one might use a constant to represent NO_MAX_HEIGHT.
  ECMAScript acquired a const keyword to be able to define constants in 2015.
  the auto-updating browsers (Firefox, Chrome) can be trusted to support this feature but if you need to support IE...
  Internet Explorer is why we can't have nice things.
  */
  var heightCheck = function(requirements, height) {
   return (height > requirements.minheight && (height < requirements.maxheight || requirements.maxheight === 0)); 
  };


  /*
  it's not necessary for this function to return anything, but it's good practice
  in this case, $.each will return the object it's working with (rides)
  this is getting its input directly from the $.map() function, so it's getting an array of names of rides
    ['ridename', 'ridename', (...)]
  */
  var showRides = function(rides) {
    /* 
      $.each gives its arguments as index, value, as opposed to $.map() which is the reverse
      I'm sure this makes sense on some level
      
      I almost feel like anything that touches the DOM should get its own function
      so you could break this down even further and just have a showRide() function that would only show one ride
      
      This function iterates over the array and concats the string '.ride#' with the strings from the array
      It uses that as a selector to show the page elements
    */
    return $.each(rides, function(index, ridename){
      $('.ride#' + ridename).show();
    });
  };

  /*
  The submit handler. Nothing to see here, really.
  */
  $('form').submit(function() {
    $('.ride').hide();
    //further input validation would be a good idea
    //the user should be prevented from entering a negative or non-numeric value
    var height = parseInt($('form input').val());
    showRides(getAllowedRides(height, allrides));
    /*
    The above line could be replaced with:
    allInOneGo(height, allrides);
    or
    oneParameter(allrides);
    */
    return false;
  });

  /*
  Copying and pasting all of the above functions into one gives us this monster
  I'm not sure whether this is a terrible way to write javascript, a typical way to write javascript, or both
  */
  var allInOneGo = function(height, rides) {
    $.each(
      //$.each() gets passed two arguments, this function is the first. It returns an array
      $.map(rides, function(requirements, ridename) {
        if ((height > requirements.minheight && (height < requirements.maxheight || requirements.maxheight === 0))) {
          return ridename;
        }
        //this is the second argument, which $.each() uses on each item of the set
      }), function(index, value){
        $('.ride#' + value).show();
    });
  };
  /*
  Just for giggles.
  */
  var allInOneLine = function(height, rides) {
    $.each($.map(rides, function(requirements, ridename) { if ((height > requirements.minheight && (height < requirements.maxheight || requirements.maxheight === 0))) { return ridename; }}), function(index, value){ $('.ride#' + value).show(); }); 
  };

  /*
  Okay, now this is getting silly
  */
  var oneParameter = function(rides) {
    $.each($.map(rides, function(requirements, ridename) { if ((parseInt($('form input').val() > requirements.minheight && (parseInt($('form input').val() < requirements.maxheight || requirements.maxheight === 0))) { return ridename; }}), function(index, value){ $('.ride#' + value).show(); }); 
  };

  /*
  Thanks for reading!
  
  */
});
