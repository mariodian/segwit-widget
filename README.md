# segwit-widget
Activation progress of Segregated Witness

This simple widget for your website checks whether Segregated Witness has already been activated on the network.

![SegWit activation widget](https://freedomnode.com/uploads/images/c6cdf0180dd26ef9f0e3c790d2f06a06c75b7ab6a11e5e7436879edc4b750263.png)

It's fully responsive and adjusts to the parent element's size and style.
Hope you enjoy it!

[Demo](https://segwit.freedomnode.com/demo.php)

## Usage

Simply copy and paste the following code where you want the widget displayed:

````
<script>(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = '//widget.js';
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script'));</script>
<div id="segwit-widget"></div>
````

## Parameters

Customize the widget via HTML data property. Example:

````<div id="segwit-widget" data-bg-color="#333" data-text-color="#aaaaaa"></div>````

Key | Description
------------ | -------------
bgColor | Background color below a progress bar wrapper
textColor | Widget text color
padding | Widget padding in px/rem/em
align | Text align - (left|right|center)
statusBgColor | Background color of a top "status" element
statusTextYes | Text of "yes" SegWit state
statusTextLockedIn | Text of "locked-in" SegWit state
statusTextNo | Text of "no" SegWit state
statusTextNoLockedIn | Text of "no" SegWit state but locked in
statusTextAlmost | Text of "almost there" SegWit state
statusTextAlmostLockedIn | Text of "almost locked in" SegWit state
progressBgColor | Background color of a progress bar wrapper
progressRadius | Progress bar radius in px
progressColor | Progress bar color
progressColorActivated | Color of "SegWit activated" progress bar

You can also customize it with CSS.

## Acknowledgment
Data courtesy of [api.qbit.ninja](http://api.qbit.ninja/versionstats). Thank you!

Inspired by [segwit.co](http://www.segwit.co/).
