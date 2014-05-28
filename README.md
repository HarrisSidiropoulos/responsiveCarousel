# responsiveCarousel [![Build Status](https://secure.travis-ci.org/HarrisSidiropoulos/responsiveCarousel.png?branch=master)](http://travis-ci.org/HarrisSidiropoulos/responsiveCarousel)

Extending Bootstarp Carousel to work with responsive images and video from vimeo.

## Getting Started
Install the module with: `npm install HarrisSidiropoulos/responsiveCarousel`

```javascript
require('responsiveCarousel');
```
```html
<div data-ride="responsive-carousel" data-autoplay="false" data-load-next-previous="true" data-background-scale="" data-scale-background-proportionally="true" data-img-stretch="true" class="carousel slide">
    <ol class="carousel-indicators">
      <li data-slide-to='0' class="active"></li>
      <li data-slide-to='1'></li>
      <li data-slide-to='2'></li>
      <li data-slide-to='3'></li>
    </ol>
    <div class="carousel-inner">
      <div class="item active">
        <div class="carousel-media-control"><a href="#" data-media-type="vimeo" data-media-src="//player.vimeo.com/video/91090531"><span class="glyphicon glyphicon-play"></span></a></div><img data-src="//dummyimage.com/1140x500/787678/fff" data-md-src="//dummyimage.com/992x435/787678/fff" data-sm-src="//dummyimage.com/768x337/787678/fff" data-xs-src="//dummyimage.com/480x211/787678/fff"/>
      </div>
      <div class="item"><img data-src="//dummyimage.com/1140x500/787678/fff" data-md-src="//dummyimage.com/992x435/787678/fff" data-sm-src="//dummyimage.com/768x337/787678/fff" data-xs-src="//dummyimage.com/480x211/787678/fff"/>
      </div>
      <div class="item"><img data-src="//dummyimage.com/1140x500/787678/fff" data-md-src="//dummyimage.com/992x435/787678/fff" data-sm-src="//dummyimage.com/768x337/787678/fff" data-xs-src="//dummyimage.com/480x211/787678/fff"/>
      </div>
      <div class="item"><img data-src="//dummyimage.com/1140x500/787678/fff" data-md-src="//dummyimage.com/992x435/787678/fff" data-sm-src="//dummyimage.com/768x337/787678/fff" data-xs-src="//dummyimage.com/480x211/787678/fff"/>
      </div>
    </div><a href="#" data-slide="prev" class="left carousel-control"><span class="glyphicon glyphicon-chevron-left"></span></a><a href="#" data-slide="next" class="right carousel-control"><span class="glyphicon glyphicon-chevron-right"></span></a>
  </div>
</div>
```
## Documentation
_(Coming soon)_

## Examples
Clone current repository

run: `npm install && bower install && gulp`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 . Licensed under the MIT license.
