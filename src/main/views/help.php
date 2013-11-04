<!DOCTYPE html>
<html>
<head>
    <title>Wix GAE Example App - Help</title>
    <style>
      .text-error { color:red; background:rgba(255,0,0,0.1); padding:5px; }
      .text-info{ color:rgb(0,100,255); background:rgba(0,100,255,0.1); padding:5px; }
      .container{ margin-top:20px; padding:20px;  box-shadow:#ccc 0 0 15px; border-radius:5px; }    
    </style>
</head>
<body>

    <div class="container">
        <h1>Wix GAE Example App - Help</h1>
        <h2>Your App is alive</h2>
        <hr/>
        <p class="text-info">You can now proceed to code your Wix App Endpoints using Spring MVC controllers and GAE Services</p>
        <p>Important links:</p>
        <ul>
            <li><a href="http://dev.wix.com/">Wix Developers Center</a></li>
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
    
</body>
</html>