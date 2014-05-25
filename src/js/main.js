/*
var logger = require('./logger');
var animationEvents = require('animationevents');
var requestAnimFrame = require("animationframe");
var $ = require("jquery");

require("bootstrapify");
require("./responsiveCarousel");

var onEnterFrame = function() {
  //logger.log(animationEvents.animationEventEnd);
  requestAnimFrame(onEnterFrame);
}

requestAnimFrame(onEnterFrame);
$("h1").html("test");
*/

require("./responsiveCarousel");