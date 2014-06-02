/*
 responsiveCarousel
 */
var $ = require("jquery"),
    translate3d = require("css3-translate"),
    hammerjs = require("hammerjs"),
    requestAnimFrame = require("animationframe");

require("jquery.transit");
require("bootstrapify");

(function ($) {

  'use strict';

  $.fn.responsiveCarouselStopAllVideo = function() {
    return this.each(function () {
      var $this = $(this);

      if ($this.hasClass("carousel-video-playing")) {
        $this.find(".carousel-media").html("");
        $this.find(".carousel-media").remove();
        $this.removeClass("carousel-video-playing");
      }
    });
  }

  $.fn.responsiveCarousel = function () {
    return this.each(function () {

      var DEFAULTS = {
        maxImageWidth: 0,
        maxImageHeight: 0,
        backgroundScale: false,
        scaleBackgroundProportionally: true,
        imgStretch: true,
        loadNextPrevious: true,
        reloadOnResize: true,
        autoplay: false,
        screenXs: 480,
        screenSm: 768,
        screenMd: 992,
        screenLg: 1140
      }

      var $this = $(this),
        imagesContainer = $this.find(".carousel-inner"),
        settings = $.extend(DEFAULTS, $this.data()),
        carouselMediaControls = $this.find(".carousel-media-control a"),
        imageItems = $this.find(".carousel-inner .item img"),
        carouselWidth = $this.width(),
        maxImageWidth = settings.maxImageWidth,
        maxImageHeight = settings.maxImageHeight,
        backgroundScale = settings.backgroundScale,
        scaleBackgroundProportionally = settings.scaleBackgroundProportionally,
        reloadOnResize = settings.reloadOnResize,
        stretch = settings.imgStretch,
        loadNextPrevious = settings.loadNextPrevious,
        SCREEN_XS = settings.screenXs,
        SCREEN_SM = settings.screenSm,
        SCREEN_MD = settings.screenMd,
        SCREEN_LG = settings.screenLg;

      $this.unbind("slide.bs.carousel", onImageChange).bind("slide.bs.carousel", onImageChange);
      carouselMediaControls.unbind("click", onMediaControlClick).bind("click", onMediaControlClick);

      if (!settings.autoplay) {
        $('.carousel').carousel({
          interval: 1000000000
        });
      }

      var element = hammerjs($this.get()[0]);
      var activeImage, index, nextIndex, previousIndex, nextImage, previousImage;

      if (imageItems.length>1) {
        element.on("dragstart", onDragStart);
        element.on("drag", onDrag);
        element.on("dragend", onDragEnd);
      }
      function onDragStart(event) {
        var imagesLength = imageItems.length;
        activeImage = imagesContainer.find(".active");
        index = activeImage.index();

        previousIndex = index===0 ? imageItems.length-1 : index- 1;
        previousImage = $(imageItems[previousIndex]).parent();
        previousImage.addClass("prev");

        nextIndex = index === imageItems.length-1 ? 0 : index+1;
        nextImage = $(imageItems[nextIndex]).parent();
        nextImage.addClass("next");

        if (imagesLength===2 && index===0) {
          previousImage.removeClass("prev");
        } else if (imagesLength===2 && index===imagesLength-1) {
          nextImage.removeClass("next");
        }

        if (event.gesture) event.gesture.preventDefault();
      }

      function onDrag(event) {
        var a = activeImage.get()[0];
        var b = nextImage.get()[0];
        var c = previousImage.get()[0];

        translate3d.x(a, event.gesture.deltaX);
        translate3d.x(b, event.gesture.deltaX);
        translate3d.x(c, event.gesture.deltaX);
        if (event.gesture) event.gesture.preventDefault();
      }

      function onDragEnd(event) {
        var x = 0, duration = 480, threshold = $this.width()*.2,
          isNext = event.gesture.deltaX<-threshold,
          isPrevious = event.gesture.deltaX>threshold;
        if (imageItems.length===2) {
          isNext = isNext && index===0;
          isPrevious = isPrevious && index===imageItems.length-1;
        }
        if (isNext) {
          x = -$this.width();
        } else if (isPrevious) {
          x = $this.width();
        } else {
          x = 0;
        }
        var transition = {
          duration: duration, easing:"ease-in-out"
        };
        var rule = "-"+translate3d.rule().toLowerCase().replace(/transform/, "-transform");
        transition[rule] = "translate3d("+x+"px, 0px, 0px)";

        activeImage.transition(transition);
        nextImage.transition(transition);
        if (imageItems.length>2)
          previousImage.transition(transition);

        setTimeout(function() {
          var a = activeImage.get()[0];
          var b = nextImage.get()[0];
          var c = previousImage.get()[0];

          translate3d.x(a, 0);
          translate3d.x(b, 0);
          translate3d.x(c, 0);

          if (isNext) {
            nextImage.addClass("disable-transition");
            nextImage.addClass("active");
          } else if (isPrevious) {
            previousImage.addClass("disable-transition");
            previousImage.addClass("active");
          }
          if (isNext || isPrevious) {
            activeImage.removeClass("active");
          }
          nextImage.removeClass("next");
          previousImage.removeClass("prev");

          requestAnimFrame(function() {
            requestAnimFrame(function() {
              activeImage.removeClass("disable-transition");
              nextImage.removeClass("disable-transition");
              previousImage.removeClass("disable-transition");
              activeImage = imagesContainer.find(".active");
              index = activeImage.index();
              if (isNext || isPrevious) {
                $(".carousel-indicators .active").removeClass("active");
                $(".carousel-indicators li").eq(index).addClass("active");

                $this.trigger("slide.bs.carousel");
                $this.trigger("slid.bs.carousel");
              }
            });
          })
        }, duration);
      }

      $(window).unbind("resize", onWindowResize).bind("resize", onWindowResize);
      onImageChange();
      onWindowResize();

      function onWindowResize() {
        requestAnimFrame(function () {
          resizeCarousel();
        });
      }
      function resizeCarousel() {
        if (stretch) {
          imageItems.each(function() {
            $(this).width($(this).parent().parent().width());
          });
        }
        if (backgroundScale && scaleBackgroundProportionally) {
          var stretchValue = stretch ? 10 : 1;
          var dimensions = getAspectRatioDimensions(maxImageWidth*stretchValue, maxImageHeight*stretchValue, $this.width());
          imageItems.each(function() {
            $(this).parent().height(dimensions.height);
          });
          $this.height(dimensions.height);
        }
        if (reloadOnResize) startImageLoading(imagesContainer.find(".active img"));
      }

      function onMediaControlClick(e) {
        var modal = $('.modal.video-container'),
          btn = $(this);

        addVideo(btn.parent().parent().find(".carousel-media-control"));
        e.preventDefault();

        function addVideo(element) {
          if ($this.hasClass("carousel-video-playing")) return;
          if (btn.data("media-type") === "vimeo") {
            element.before(generateVimeo(btn.data("media-src")));
            $this.addClass("carousel-video-playing");
          }
        }
      }

      function onImageChange() {
        requestAnimFrame(function () {
          var img = $this.find(".carousel-inner > .next > img");
          if (img.length==0) {
            img = $this.find(".carousel-inner > .active > img");
          }
          var index = img.parent().index(),
            nextIndex = index === imageItems.length-1 ? 0 : index+1,
            previousIndex = index===0 ? imageItems.length-1 : index-1;

          loadImage(img);
          if (loadNextPrevious) {
            var nextImage = $(imageItems[nextIndex]),
                previousImage = $(imageItems[previousIndex]);

            loadImage(nextImage);
            loadImage(previousImage);
          }
          $this.responsiveCarouselStopAllVideo();
        });
      }

      function loadImage(img) {
        if (typeof img.attr("src") === "undefined" || backgroundScale) {
          setImageDimensionsBeforeLoad(img);
        }
        startImageLoading(img);
      }
      function preload(img) {
        img.parent().addClass("loading");
        var src = getImageSrc(img);
        var tempImage = $('<img/>');
        tempImage.attr("src", src);

        tempImage.load(function () {
          img.parent().removeClass("loading");
          requestAnimFrame(function() {
            displayImage(img);
          });
        });
      }
      function startImageLoading(img) {
        preload(img);
      }

      function displayImage(img) {
        var src = getImageSrc(img);
        if (img.attr("src")===src && !backgroundScale) return;
        if (img.parent().data("src") === src && backgroundScale) return;

        if (backgroundScale) {
          img.css("display", "none");
          img.parent().css("backgroundPosition", "center");
          img.parent().css("backgroundImage", "url("+src+")");
          img.parent().css("backgroundRepeat", "no-repeat");
          img.parent().css("background-size", backgroundScale);
          img.parent().data("src", src);
          if ($this.height()>0) return;
        } else {
          img.css("display", "block");
        }
        img.parent().addClass("loading");
        img.attr("src", src);
        img.load(function () {
          img.parent().removeClass("loading");
          setImageDimensionsOnLoad(img);
        });
      }

      function getImageSrc(img) {
        var maxWidth = $this.width(),
          imgData = img.data(),
          src = imgData.src;

        if (maxWidth>SCREEN_MD) {
          src = imgData.lgSrc || imgData.srcLg || src;
        } else if (maxWidth>SCREEN_SM) {
          src = imgData.mdSrc || imgData.srcMd || src;
        } else if (maxWidth>SCREEN_XS) {
          src = imgData.smSrc || imgData.srcSm || src;
        } else {
          src = imgData.xsSrc || imgData.srcXs || src;
        }

        return src;
      }

      function setImageDimensionsBeforeLoad(img) {
        var carouselHeight = $this.height();
        carouselHeight = carouselHeight === 0 ? carouselWidth / maxImageWidth * maxImageHeight : carouselHeight;
        var w = img.data("width"), h = img.data("height");
        w = typeof w === "undefined" ? carouselWidth : w;
        h = typeof h === "undefined" ? carouselHeight : h;
        var dimensions = getAspectRatioDimensions(parseInt(w), parseInt(h), carouselWidth);
        img.width(dimensions.width);
        img.height(dimensions.height);
      }

      function setImageDimensionsOnLoad(img) {
        if (backgroundScale && img.height()>0) {
          $this.height(img.height());
          if (scaleBackgroundProportionally) scaleBackgroundProportionally = true;
          maxImageWidth = img.width();
          maxImageHeight = img.height();
          img.parent().height(img.height());
          img.css("display", "none");
          onWindowResize();
        }
        if (stretch) {
          img.css("width", $this.width());
        } else {
          img.css("width", "inherit");
        }
        img.css("height", "inherit");
      }

       function getAspectRatioDimensions(width, height, maxWidth, maxHeight) {
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

      function generateVimeo($url) {
        var strVar = '<div class="carousel-media">';
        strVar += "<iframe src=\"" + $url + "?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1\" width=\"100%\" height=\"100%\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen><\/iframe>";
        strVar += '</div>';
        return $(strVar);
      }

      $(document).off('click.bs.carousel.data-api', '[data-slide], [data-slide-to]');
      $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
        var $this   = $(this), href
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        var options = $.extend({}, $target.data(), $this.data())
        var slideIndex = $this.attr('data-slide-to')
        if (slideIndex) options.interval = false
        if ($target.length===0) {
          if ($this.parent().hasClass("carousel")) {
            $target = $this.parent();
          } else if ($this.parent().parent().hasClass("carousel")) {
            $target = $this.parent().parent();
          } else if ($this.parent().parent().parent().hasClass("carousel")) {
            $target = $this.parent().parent().parent();
          }
        }
        $target.carousel(options)

        if (slideIndex = $this.attr('data-slide-to')) {
          $target.data('bs.carousel').to(slideIndex)
        }

        e.preventDefault()
      });
    });
  }
  $("[data-ride=responsive-carousel]").responsiveCarousel();
})($);