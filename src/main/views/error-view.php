<!DOCTYPE html>
<html>
<head>
    <title>Wix GAE Example App - Generic Error</title>
    <link href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css" rel="stylesheet">
    <link href="http://twitter.github.com/bootstrap/assets/css/bootstrap-responsive.css" rel="stylesheet">

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="http://current.bootstrapcdn.com/bootstrap-v204/js/bootstrap.js"></script>
    <script type="text/javascript" src="http://sslstatic.wix.com/services/js-sdk/1.16.4/js/Wix.js"></script>
    <style type="text/css">
        .stack-trace {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px;color: rgb(110, 109, 105);margin-left: 20px;}
        .caused-by {font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px;color: rgb(133, 50, 48) }
    </style>
</head>
<body>
<div class="container-fluid">
    <div class="container-fluid thumbnail" style="margin-top:20px; padding:20px; box-shadow:#ccc 0 0 15px">
        <h1>Wix GAE Example App - Generic Error</h1>
        <h2>Your App is alive on Google App Engine</h2>
        <hr/>
        <h3 class="text-info">However, you seem to have an error in you application</h3>
        <p class="text-error">${exceptionMessage}</p>
        <div class="caused-by">Caused by</div>
        ${exceptionStackTrace}
        <hr/>
        <p>Important links:</p>
        <ul>
            <li><a href="http://dev.wix.com/">Wix Developers Center</a></li>
            <li><a href=https://developers.google.com/appengine/>Google App Engine Documentation</a></li>
            <li><a href=https://appengine.google.com/>Google App Engine Dashboard</a></li>
            <li><a href=http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/mvc.html>Spring MVC documentation</a></li>
            <li><a href=http://velocity.apache.org/engine/devel/user-guide.html>Velocity Documentation</a> (the src/main/resources/views/*.vm files)</li>
            <li><a href=http://twitter.github.com/bootstrap/>Bootstrap</a> (the CSS library used in the example)</li>
        </ul>
    </div>
</div>
</body>
</html>