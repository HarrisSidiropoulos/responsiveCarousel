# ResponsiveCarousel.js

Extending Bootstarp Carousel to work with responsive images

## Get Started

Install using bower:

```shell
bower install responsiveCarousel
```

```html
<div class="carousel slide" data-ride="responsive-carousel"
     data-autoplay="false" data-load-next-previous="true" data-img-stretch="true">
  <!-- indicators -->
  <ol class="carousel-indicators">
    <li data-slide-to="0" class="active"></li>
    <li data-slide-to="1" class=""></li>
    <li data-slide-to="2" class=""></li>
    <li data-slide-to="3" class=""></li>
    <li data-slide-to="4" class=""></li>
  </ol>
  <!-- images -->
  <div class="carousel-inner">
    <div class="item active">
      <div class="carousel-media-control">
        <a href="#" data-media-type="vimeo" data-media-src="//player.vimeo.com/video/91090531">
          <span class="glyphicon glyphicon-play"></span>
        </a>
      </div>
      <img data-src="assets/images/1200/img001.jpg"
           data-md-src="assets/images/992/img001.jpg"
           data-sm-src="assets/images/768/img001.jpg"
           data-xs-src="assets/images/480/img001.jpg"/>
    </div>
    <div class="item ">
      <img data-src="assets/images/1200/img002.jpg"
           data-md-src="assets/images/992/img002.jpg"
           data-sm-src="assets/images/768/img002.jpg"
           data-xs-src="assets/images/480/img002.jpg"/>
    </div>
    <div class="item ">
      <img data-src="assets/images/1200/img003.jpg"
           data-md-src="assets/images/992/img003.jpg"
           data-sm-src="assets/images/768/img003.jpg"
           data-xs-src="assets/images/480/img003.jpg"/>
    </div>
    <div class="item ">
      <img data-src="assets/images/1200/img004.jpg"
           data-md-src="assets/images/992/img004.jpg"
           data-sm-src="assets/images/768/img004.jpg"
           data-xs-src="assets/images/480/img004.jpg"/>
    </div>
    <div class="item ">
      <img data-src="assets/images/1200/img005.jpg"
           data-md-src="assets/images/992/img005.jpg"
           data-sm-src="assets/images/768/img005.jpg"
           data-xs-src="assets/images/480/img005.jpg"/>
    </div>
  </div>
  <!-- Controls -->
  <a class="left carousel-control" href="#" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
  </a>
  <a class="right carousel-control" href="#" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
  </a>
</div>
```

```javascript
$('carousel').responsiveCarousel();
```
