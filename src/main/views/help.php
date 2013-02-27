<!DOCTYPE html>
<html>
<head>
    <title>Wix GAE Example App - Help</title>
    <link href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css" rel="stylesheet">
    <link href="http://twitter.github.com/bootstrap/assets/css/bootstrap-responsive.css" rel="stylesheet">

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="http://current.bootstrapcdn.com/bootstrap-v204/js/bootstrap.js"></script>
</head>
<body>
<div class="container-fluid">
    <div class="container-fluid thumbnail" style="margin-top:20px; padding:20px; box-shadow:#ccc 0 0 15px">
        <h1>Wix GAE Example App - Help</h1>
        <h2>Your App is alive on Google App Engine</h2>
        <hr/>
        <p>You can now proceed to code your Wix App Endpoints using Spring MVC controllers and GAE Services</p>
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
    <h2>The project structure</h2>
    <pre style="font-family: inconsolata, monospace;" margin>
src                                  &rarr; The sources folder
 &#9492; main                              &rarr; Production sources
   &#9492; java                            &rarr; Java production sources
     &#9492; com.wixpress.app              &rarr; Your code package (can be changed to anything you like)
       &#9492; controller                  &rarr; Application Controllers
       &#9492; dao                         &rarr; Data Access Objects
       &#9492; domain                      &rarr; Application business layer
       &#9492; spring                      &rarr; Spring Wiring
   &#9492; resources                       &rarr; Managed Resources
     &#9492; views                         &rarr; Application Views - Velocity Templates
   &#9492; webapp                          &rarr; Root of the WAR archive
     &#9492; WEB-INF                       &rarr; WAR deployment descriptors folder
       &#9492; appengine-web.xml           &rarr; App Engine configuration
       &#9492; mvc-dispatcher-servlet.xml  &rarr; Spring MVC configuration
       &#9492; web.xml                     &rarr; WAR deployment descriptor
 &#9492; test                              &rarr; Test sources
   &#9492; java                            &rarr; Java test sources
pom.xml                              &rarr; Maven definition file
    </pre>
    </div>
</body>
</html>