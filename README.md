# segwit-widget
Activation progress of Segregated Witness

This simple widget for your website checks whether Segregated Witness has already been activated on the network.

![SegWit activation widget](https://freedomnode.com/uploads/images/c6cdf0180dd26ef9f0e3c790d2f06a06c75b7ab6a11e5e7436879edc4b750263.png)

It's fully responsive and adjusts to the parent element's size and style.
Hope you enjoy it!

## Usage

Simply copy and paste the following code where you want the widget displayed:

````
<script>(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = '//segwit.freedomnode.com/widget.min.js';
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script'));</script>
<div id="segwit-widget"></div>
````

## Parameters

Customize the widget via HTML data property. Example:

````<div id="segwit-widget" data-bg-color="#333" data-text-color="#aaaaaa"></div>````

