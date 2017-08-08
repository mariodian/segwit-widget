(function() {
  var isDarkColor = function(color) {
    var c = color.substring(1);  // strip #
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 40) {
        return true;
    }

    return false;
  }

  var ns = 'segwit',
      $wrapper = document.getElementById(ns + '-widget');

  var dataset = $wrapper.dataset,
      settings = {
        bgColor: '#fafafa',
        textColor: '#333',
        padding: '1rem',
        align: 'center',

        statusBgColor: '#eceff1',
        statusTextYes: 'Yes!',
        statusTextLockedIn: 'Locked in! Will be activated soon.',
        statusTextNo: 'Not yet :(',
        statusTextNoLockedIn: 'Locked in! Will be activated in this period.',
        statusTextAlmost: 'Almost there!',
        statusTextAlmostLockedIn: 'Almost locked in!',

        progressBgColor: '#eceff1',
        progressRadius: '3px',
        progressColor: '#5bc0de',
        progressColorActivated: '#5cb85c',
      };

  // Overwrite with custom settings
  for (var attrname in dataset) {
    settings[attrname] = dataset[attrname];
  }
  // settings = Object.assign(settings, dataset); // Doesn't work in Safari

  // Build the widget
  var html = '<div id="' + ns + '-status-wrapper">';
      html += '   <div id="' + ns + '-status-title">Is SegWit activated?</div>';
      html += '   <div id="' + ns + '-status">Fetching the status...</div>';
      html += '</div>';
      html += '<div id="' + ns + '-progress-wrapper">';
      html += '   <div id="' + ns + '-progress-bg">';
      html += '       <div id="' + ns + '-progress" style="width: 0%"><span id="' + ns + '-progress-percentage"></span></div>';
      html += '       <div id="' + ns + '-progress-threshold"></div>';
      html += '   </div>';
      html += '   <div id="' + ns + '-progress-data"><span id="' + ns + '-progress-blocks">?</span> out of 2016 blocks<br>since the last retarget period</div>';
      html += '</div>';
      html += '<div style="background: #fff; font-size: 0.8rem; padding: 8px ' + settings.padding + '; color: rgba(0, 0, 0, 0.4);">';
      html += 'Created by <a href="https://freedomnode.com/segwit-activation-widget" style="color: rgba(0, 0, 0, 0.7);" target="_blank">Freedom Node</a>';
      html += '</div>';

  $wrapper.innerHTML = html;

  // Style the wrapper
  $wrapper.style.backgroundColor = settings.bgColor;
  $wrapper.style.color = settings.textColor;
  $wrapper.style.lineHeight = 1.5;
  $wrapper.style.width = '100%';
  $wrapper.style.height = 'inherit';
  $wrapper.style.textAlign = settings.align;
  $wrapper.style.minWidth = '200px';

  var $status = document.getElementById(ns + '-status'),
      $statusTitle = document.getElementById(ns + '-status-title'),
      $statusWrapper = document.getElementById(ns + '-status-wrapper'),

      $progressWrapper = document.getElementById(ns + '-progress-wrapper'),
      $progressBg = document.getElementById(ns + '-progress-bg'),
      $progress = document.getElementById(ns + '-progress'),
      $progressPercentage = document.getElementById(ns + '-progress-percentage'),
      $progressThreshold = document.getElementById(ns + '-progress-threshold'),
      $progressData = document.getElementById(ns + '-progress-data'),
      $progressBlocks = document.getElementById(ns + '-progress-blocks'),

      fontSmall = '0.9rem';

  // Style the widget
  $statusWrapper.style.backgroundColor = settings.statusBgColor;
  $statusWrapper.style.padding = settings.padding;

  $statusTitle.style.fontSize = '2.4rem';
  $statusTitle.style.fontWeight = 100;
  $statusTitle.style.lineHeight = 1.2;

  $status.style.fontWeight = 'bold';
  $status.style.marginTop = '8px';

  $progressWrapper.style.padding = settings.padding;

  $progressBg.style.position = 'relative';
  $progressBg.style.borderRadius = settings.progressRadius;
  $progressBg.style.overflow = 'hidden';
  $progressBg.style.height = '28px';
  $progressBg.style.backgroundColor = settings.progressBgColor;

  $progress.style.fontSize = fontSmall;
  $progress.style.fontWeight = 'bold';
  $progress.style.lineHeight = '28px';
  $progress.style.height = 'inherit';
  $progress.style.backgroundColor = settings.progressColor;

  $progressPercentage.style.position = 'absolute';
  $progressPercentage.style.left = '8px';
  $progressPercentage.style.color = isDarkColor(settings.progressColor) ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';

  $progressThreshold.style.position = 'absolute';
  $progressThreshold.style.left = '95%';
  $progressThreshold.style.marginLeft = '-1px';
  $progressThreshold.style.top = 0;
  $progressThreshold.style.width = '1px';
  $progressThreshold.style.height = 'inherit';
  $progressThreshold.style.borderLeft = isDarkColor(settings.progressBgColor) ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)';

  $progressData.style.marginTop = '8px';
  $progressData.style.fontSize = fontSmall;

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
      if (xmlhttp.status == 200) {
        var obj = JSON.parse(xmlhttp.responseText);

        if ( typeof obj.data !== 'undefined') {
          var data = obj.data,
              count = data.count,
              percentage = data.percentage,
              lockedIn = data.locked_in;

          if (count !== null && percentage !== null) {
            $progress.style.width = percentage + '%';
            $progressPercentage.innerHTML = (percentage % 1 == 0 ? percentage : percentage.toFixed(1)) + '%';

            if (percentage >= 95) {
              if (lockedIn === 1) {
                $status.innerHTML = settings.statusTextYes;
                $progress.style.backgroundColor = settings.progressColorActivated;
              } else {
                $status.innerHTML = settings.statusTextLockedIn;
              }
            } else if (percentage < 95 && percentage >= 90) {
              if (lockedIn) {
                $status.innerHTML = settings.statusTextAlmost;
              } else {
                $status.innerHTML = settings.statusTextAlmostLockedIn;
              }
            } else {
              if (lockedIn) {
                $status.innerHTML = settings.statusTextNoLockedIn;
              } else {
                $status.innerHTML = settings.statusTextNo;
              }
            }

            $progressBlocks.innerHTML = count;
          }
        }
      }
      else {
        $status.innerHTML = 'Something went wrong';
      }
    }
  };

  xmlhttp.open("GET", "//segwit.freedomnode.com/data.php", true);
  xmlhttp.send();
})();
