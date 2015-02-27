
This is just a fork [of this repo](https://github.com/kvendrik/responsive-images.js) with two differences.

1. This script uses the width of the parent's container rather than the screen's width
2. This script automatically takes device pixel ratio into account and swaps images accordinally

Use like so...

```html
<img src = "images/world-placeholder.jpg" class="foo" id="bar" alt=""
data-src = "<400:images/world-small.jpg,
            <800:images/world-medium.jpg,
            <1200:images/world-large.jpg,
            <1600:images/world-huge.jpg,
            >1600:images/world-massive.jpg" />
```

specify as few or as many breakpoints as you wish

placeholder images are optional, chose one with dimensions ~ 1024x768px, size ~ 20kb

[DEMO](https://rawgit.com/Paul-Browne/ResImg.js/master/demo.html)
