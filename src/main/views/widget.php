<!DOCTYPE html>
<html>
<head>
    <link type="text/css" href="/app/static/css/rss.widget.css" rel="stylesheet">
	<link rel="stylesheet" href="/app/static/external_modules/flexcrollstyles.css"/>
    <!--link type="text/css" href="/app/static/external_modules/scrollbar/css/jquery.tinyscrollbar.css" rel="stylesheet"-->
	<style wix-style type="text/css">
		
		#widget-body{
			background-color: {{style.bgColor}}
		}
		
		#feedTitle{
			color: {{style.titleColor}}
		}
		
		#feedEntries{
			background-color: {{style.bgFeedColor}}
		}
		
		.feed{
			color: {{style.textColor}}
		}
		
	</style>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
	
</head>
<body>

	<div id="widget-body" class="flexcroll">
		<div class="widget-header">
			<div class="main-title" id="feedTitle"></div>
		</div>
		<div class="overview">
			<div class="feed-container" id="feedEntries"></div>
		</div>
	</div>


<script type="text/javascript">
    <?php
        echo "var newSettings = JSON.parse('$settings')";
    ?>
</script>

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript" src="/app/static/external_modules/flexcroll.js"></script>
<script type="text/javascript" src="http://sslstatic.wix.com/services/js-sdk/1.22.0/js/Wix.js"></script>
<script type="text/javascript" src="/app/static/js/common.js"></script>
<!--script type="text/javascript" src="/app/static/external_modules/scrollbar/js/jquery.tinyscrollbar.js"></script-->
<script type="text/javascript" src="/app/static/js/rss.widget.js"></script>
</body>
</html>