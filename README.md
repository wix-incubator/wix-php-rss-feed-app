# RSS Feed App - (PHP)

## About  
A Wix App, RSS Feed, demonstrating how to build a production ready app. Client & Server from scratch using PHP server & Wix client side libraries.

##### Click here for <a href="http://editor.wix.com/html/editor/web/renderer/new?siteId=b1b3473c-8124-4de4-a074-0f650b1b3ee4&appDefinitionId=12d96f52-091d-56de-82ec-51cd5b3c7bbd" target="_blank">demo</a> live sample.

### Intro 

This is app is built using the same structure and concept as the <a href="https://github.com/wix/wix-gae-rss-feed-app">RSS Feed on Google App Engine</a> but uses PHP as it's backend. The client side (html/js/css) is EXACTLY identical.

This project is set to work on your local dev machine using Apache HTTP server and a local sqlite3 database.

### Setup

#### How To Install

1. Download and install wamp form http://www.wampserver.com/en/  (you only need the apache server).
2. Install the mod rewrite module for apache.
3. Under your wamp server root (e.g. on Windows C:\wamp\www) create a folder named app.
4. Make sure that the app index.php is reachable from the 'localhost/app' folder by either:
   - Creating an alias from the 'localhost/app' folder to the 'wix-rss-feed-app/src/main' folder
   - Copying the content of the 'wix-rss-feed-app/src/main' folder to the 'localhost/app' folder
5. Change the APP_SECRET inside the authentication resolver to your app secret.


## License

Copyright (c) 2012 Wix.com, Inc 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

