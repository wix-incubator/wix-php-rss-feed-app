<!DOCTYPE html>
<html>
<head>
    <title>Widget Settings &bull; Wix</title>
    <link type="text/css" href="/app/static/wix-ui-lib/stylesheets/css/main.css" rel="stylesheet">
    <link type="text/css" href="/app/static/wix-ui-lib/stylesheets/css/settings.css" rel="stylesheet">
    <link type="text/css" href="/app/static/css/rss.settings.css" rel="stylesheet">
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
</head>
<body>

<header class="intro box">
    <div class="title">
        <!-- App Logo with native CSS3 gloss -->
        <div class="icon">
            <div class="logo">
                <span class="gloss"></span>
            </div>
        </div>

        <!-- This divider is a must according to the Wix design requirements -->
        <div class="divider"></div>
    </div>

    <!-- Connect account area -->
    <div class="login">
        <div class="guest">
            <div class="description">
                <p>
                    This app lets you connect to any RSS feed you would like.
                </p>
            </div>
            <div id="feedSignIn" class="login-panel">
                <p class="feed-label">Enter your your RSS URL</p>
                <input type="text" name="rss-feed-url" id="rssFeedUrl" placeholder="http://rss.cnn.com/rss/edition.rss"/>
                <button class="submit btn connect" id="connectBtn">Connect Feed</button>
            </div>
        </div>

        <div class="user hidden">
            <p>
                You are now connected to feed <a id="feedLink" href="" target="_blank"></a>.<br/>
                <span class="feed-description"></span><br/>
                <a class="disconnect-account" id="disconnectAccount">Disconnect Feed</a>
            </p>
        </div>
    </div>
</header>

<!-- Settings box -->
<div class="accordion">

    <!-- General Settings -->
    <div class="box">
        <h3>Settings</h3>
        <div class="feature">
            <p>Please insert number of feed entries you would like to be displayed</p>
            <ul class="list">
                <li>
                    <input id="numOfEntries" class="input-number" type="number" min="1" max="100" step="1" />
                </li>
            </ul>
        </div>
    </div>

    <!-- Color Pickers -->
    <div class="box">
        <h3>Colors</h3>
        <div class="feature">
            <p>Set the  widget colors</p>
            <ul class="list">
                <li>
                    <span class="color-picker-label">Title text</span>
                    <span class="picker"><a rel="popover" class="example-1-color-picker color-selector default" id="titleTextColor"></a></span>
                </li>
                <li>
                    <span class="color-picker-label">Text</span>
                    <span class="picker"><a rel="popover" class="example-1-color-picker color-selector default" id="textColor"></a></span>
                </li>
                <li>
                    <span class="color-picker-label">Background</span>
                    <span class="picker"><a rel="popover" class="example-1-color-picker color-selector default" id="widgetBcgColor"></a></span>
                    <span class="options checkbox" id="widgetBcgCB">
                        <span class="check"></span>
                        Opacity
                    </span>
                    <span class="slider-container">
                        0   <span class="values slider" id="widgetBcgSlider"></span>100
                    </span>
                </li>
                <li>
                    <span class="color-picker-label">Feed background</span>
                    <span class="picker"><a rel="popover" class="example-1-color-picker color-selector default" id="feedBcgColor"></a></span>
                    <span class="options checkbox" id="feedBcgCB">
                        <span class="check"></span>
                        Opacity
                    </span>
                    <span class="slider-container">
                        0   <span class="values slider" id="feedBcgSlider"></span>100</span>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</div>

<script type="text/javascript">
    <?php
        echo "var newSettings = JSON.parse('$settings')";
    ?>
</script>

<!-- Wix SDK -->
<script type="text/javascript" src="//sslstatic.wix.com/services/js-sdk/1.16.0/js/Wix.js"></script>

<!-- jQuery; needed for Twitter Bootstrap -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>

<!-- Twitter Bootstrap components;
     include this to utilize the Color Pickers, based on Tooltip and Popover -->
<script type="text/javascript" src="/app/static/wix-ui-lib/javascripts/bootstrap/bootstrap-tooltip.js"></script>
<script type="text/javascript" src="/app/static/wix-ui-lib/javascripts/bootstrap/bootstrap-popover.js"></script>

<!-- Wix UI Components -->
<script type="text/javascript" src="/app/static/wix-ui-lib/javascripts/components/accordion/accordion.js"></script>
<script type="text/javascript" src="/app/static/wix-ui-lib/javascripts/components/slider/slider.js"></script>
<script type="text/javascript" src="/app/static/wix-ui-lib/javascripts/components/checkbox/checkbox.js"></script>
<script type="text/javascript" src="/app/static/wix-ui-lib/javascripts/components/color-picker/color-pickers/simple.js"></script>
<script type="text/javascript" src="/app/static/wix-ui-lib/javascripts/components/color-picker/color-pickers/advanced.js"></script>
<script type="text/javascript" src="/app/static/wix-ui-lib/javascripts/components/color-picker/color-picker.js"></script>

<!-- Settings View Logic -->
<script type="text/javascript" src="/app/static/js/common.js"></script>
<script type="text/javascript" src="/app/static/js/rss.settings.js"></script>

</body>
</html>