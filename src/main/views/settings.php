<!DOCTYPE html>
<html>
<head>
    <title>Widget Settings &bull; Wix</title>
    <link rel="stylesheet" href="/app/static/wix-ui-lib/ui-lib.min.css"/>
	
	<link rel="stylesheet" href="/app/static/css/rss.settings.css"/>
	
	<style type="text/css">
		.acc-content{
			overflow:visible;
		}
	</style>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
</head>
<body wix-ui>

<header class="box">
    <div class="logo">
        <img width="86" src="/app/static/wix-ui-lib/images/wix_icon.png" alt="logo"/>
    </div>
    <div class="loggedOut">
        <p>This app lets you connect to any RSS feed you would like.</p>
        <div class="login-panel">
            <p class="create-account">Enter your your RSS URL</p><br>
			<input type="text" name="rss-feed-url" id="rssFeedUrl" placeholder="http://rss.cnn.com/rss/edition.rss"/>
            <button class="submit btn connect" id="connectBtn">Connect Feed</button>
        </div>
    </div>
    <div class="loggedIn hidden">
        <p>You are now connected to <a id="feedLink" href="#" target="_blank"></a>.<br/>
		<span class="feed-description"></span><br/>
        <a class="disconnect-account">Disconnect account</a></p>
    </div>
</header>

<!-- Settings box -->
<div wix-ctrl="Accordion">

    <!-- General Settings -->
    <div class="acc-pane">
        <h3>Widget General Settings</h3>
        <div class="acc-content">
            <p>Please insert number of feed entries you would like to be displayed</p>
            <ul class="list">
                <li>
                    <input id="numOfEntries" class="input-number" type="number" value="1" min="1" max="100" step="1" />
                </li>
            </ul>
        </div>
    </div>

    <!-- Color Pickers -->
    <div class="acc-pane">
        <h3>Widget Colors</h3>
        <div class="acc-content">			
            <ul class="list">
                <li wix-label="Title text">
                    <div wix-param="titleColor" wix-ctrl="ColorPicker" wix-options="{startWithColor:'black/white'}"></div>
                </li>
                <li wix-label="Text">
                    <div wix-param="textColor" wix-ctrl="ColorPicker" wix-options="{startWithColor:'black/white'}"></div>
                </li>
                <li wix-label="Background">
                    <div wix-param="bgColor" wix-ctrl="ColorPickerWithOpacity" wix-options="{startWithColor:'white/black'}"></div>
                </li>
				<li wix-label="Feed background">
                    <div wix-param="bgFeedColor" wix-ctrl="ColorPickerWithOpacity" wix-options="{startWithColor:'white/black'}"></div>
                </li>
            </ul>			
        </div>
    </div>
	
</div>

<script type="text/javascript">
    <?php echo "var newSettings = JSON.parse('$settings')"; ?>
</script>

<!-- Wix SDK -->
<script src="http://sslstatic.wix.com/services/js-sdk/1.24.0/js/Wix.js"></script>
<!-- jQuery Dependency -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<!-- Wix UI -->
<script type="text/javascript" src="/app/static/wix-ui-lib/ui-lib.min.js"></script>

<!-- Settings View Logic -->
<script type="text/javascript" src="/app/static/js/rss.settings.js"></script>

</body>
</html>