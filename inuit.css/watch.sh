#!/bin/sh

# Change `style.css` or `style.min.css` to whatever you would like your compiled
# stylesheet to be called. Do not rename `style.scss` or alter references to it.

# No minification
#sass --watch style.scss:futurepixels.css --style expanded

sass --watch style.scss:../assets/css/futurepixels.min.css --style compressed --no-cache

exit 0
