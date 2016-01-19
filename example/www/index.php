<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <title>Tapjo!T</title>

  <link href="lib/ionic/css/ionic.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">

  <!-- IF using Sass (run gulp sass first), then uncomment below and remove the CSS includes above
    <link href="css/ionic.app.css" rel="stylesheet">
    -->

  <!-- ionic/angularjs js -->

  <script src="lib/ionic/js/ionic.bundle.js"></script>
  <script src="lib/fingerprint2.min.js"></script>

  <!-- cordova script (this will be a 404 during development) -->
  <!--<script src="cordova.js"></script>-->

  <!-- your app's js -->
  <script src="js/app.js"></script>
  <script src="js/ionic.swipecards.js"></script>
</head>
<body ng-app="tapjolt" no-scroll>
  <ion-pane ng-controller="CardsCtrl" ng-init="init()" style="background-color: #FFFDFD; color: #303000;">
    <swipe-cards>
      <swipe-card on-card-swipe="cardSwiped(-1)" id="start-card" on-card-tap="cardTapped(-1)">
        <div id="msg">
          <p><img src='img/templogo2.png' alt='tap jolt' /></p>
          <p>Double tap if funny &mdash;<br />swipe if not.</p>
          <!--<p><a href="http://www.operand.io/tapjolt-tos-privacy-policy" target="_blank" data-mce-href="http://www.operand.io/tapjolt-tos-privacy-policy">(read terms before either)</a></p>-->
        </div>
      </swipe-card>
      <swipe-card id="start-card"
        ng-repeat="card in cards"
        on-card-swipe="cardSwiped($index)"
        on-card-tap="cardTapped($index)"
        on-destroy="cardDestroyed($index)">
        <div ng-controller="CardCtrl" ng-bind-html="cardContent"></div>
      </swipe-card>
    </swipe-cards>
  </ion-pane>
  <!-- Start Open Web Analytics Tracker -->
  <script type="text/javascript">
    //<![CDATA[
    var owa_baseUrl = 'http://cms.operand.io/wp-content/plugins/owa/';
    var owa_cmds = owa_cmds || [];
    owa_cmds.push(['setApiEndpoint', 'http://cms.operand.io/index.php?owa_apiAction']);
    owa_cmds.push(['setSiteId', 'fc04c1bf69a08195ca79a4855359f8f9']);
    owa_cmds.push(['trackPageView']);
    owa_cmds.push(['trackClicks']);
    owa_cmds.push(['trackDomStream']);

    (function() {
      var _owa = document.createElement('script'); _owa.type = 'text/javascript'; _owa.async = true;
      owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl );
      _owa.src = owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js';
      var _owa_s = document.getElementsByTagName('script')[0]; _owa_s.parentNode.insertBefore(_owa, _owa_s);
    }());
    //]]>
  </script>
  <!-- End Open Web Analytics Code -->
</body>
</html>
