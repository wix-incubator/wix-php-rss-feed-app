<!DOCTYPE html>
<html>
<head>
    <link type="text/css" href="/app/static/css/rss.widget.css" rel="stylesheet">
    <link type="text/css" href="/app/static/external_modules/scrollbar/css/jquery.tinyscrollbar.css" rel="stylesheet">
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
</head>
<body>

<div class="widget-body">
    <div class="widget-header">
        <div class="main-title" id="feedTitle"></div>
    </div>
    <div class="overview">
        <div class="feed-container" id="feedEntries"></div>
    </div>
</div>

<script id="feed" type="text/x-handlebars-template">
    <a class="entry-link" href="{{link}}" target="_blank">
        <div class="feed">
            <div class="title">{{title}}</div>
            <div class="content"><p>{{content}}</p></div>
        </div>
    </a>
</script>

<script type="text/javascript">
    <?php
        echo "var newSettings = JSON.parse('$settings')";
    ?>
</script>

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript" src="//sslstatic.wix.com/services/js-sdk/latest/js/Wix.js"></script>
<script type="text/javascript" src="/app/static/js/handlebars.js"></script>
<script type="text/javascript" src="/app/static/js/common.js"></script>
<script type="text/javascript" src="/app/static/external_modules/scrollbar/js/jquery.tinyscrollbar.js"></script>
<script type="text/javascript" src="/app/static/js/rss.widget.js"></script>
</body>
</html>