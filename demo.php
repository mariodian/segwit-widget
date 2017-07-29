<style>
body {
  font: 1rem 'Helvetica Neue', Helvetica, Arial, sans-serif;
  max-width: 500px;
}
</style>

<h2>SegWit Activation Widget Demo</h2>

<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = './widget.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script'));</script>


<div style="border: 1px solid rgba(0, 0, 0, 0.4)">
  <div id="segwit-widget"></div>
</div>
