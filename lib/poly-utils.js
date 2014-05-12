(function(window) {
  "use strict";

  var animationEndNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
  };
  window.animationEventEnd = animationEndNames[ Modernizr.prefixed('animation') ];

  var transitionEndNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd',
    'transition': 'transitionend'
  };
  window.transitionEventEnd = transitionEndNames[ Modernizr.prefixed('transition') ];

  var animationStartNames = {
    'WebkitAnimation': 'webkitAnimationStart',
    'OAnimation': 'oAnimationStart',
    'msAnimation': 'MSAnimationStart',
    'animation': 'animationstart'
  };
  window.animationEventStart = animationStartNames[ Modernizr.prefixed('animation') ];

  var transitionStartNames = {
    'WebkitTransition': 'webkitTransitionStart',
    'OTransition': 'oTransitionStart',
    'msTransition': 'MSTransitionStart',
    'transition': 'transitionstart'
  };
  window.transitionEventStart = transitionStartNames[ Modernizr.prefixed('transition') ];

  window.requestAnimFrame = (function () {
    return  window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  window.getAspectRatioDimensions = function (width, height, maxWidth, maxHeight) {
    maxHeight = typeof maxHeight === "undefined" ? height : maxHeight;
    var ratio = 0;  // Used for aspect ratio
    // Check if the current width is larger than the max
    if (width > maxWidth) {

      ratio = maxWidth / width;   // get ratio for scaling image
      //$this.css("width", maxWidth); // Set new width
      //$this.css("height", height * ratio);  // Scale height based on ratio
      height = height * ratio;    // Reset height to match scaled image
      width = width * ratio;    // Reset width to match scaled image
    }

    // Check if current height is larger than max
    if (height > maxHeight) {
      ratio = maxHeight / height; // get ratio for scaling image
      //$this.css("height", maxHeight);   // Set new height
      //$this.css("width", width * ratio);    // Scale width based on ratio
      width = width * ratio;    // Reset width to match scaled image
      height = height * ratio;    // Reset height to match scaled image
    }
    return {width: width, height: height};
  }
})(window);
