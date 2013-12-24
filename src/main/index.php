<?php

    require_once 'server/framework/Template.php';
    require_once 'server/AuthenticationResolver.php';
    require_once 'server/Settings.php';
    require_once 'server/Controller.php';

    $app = new Controller();

    /**
     * Before each request we verify the app instanceId and grab the app instance
     */
    $app->beforeAll(function($request) {
        $request->appInstance = AuthenticationResolver::getAppInstance();
    });

    /**
    * Widget end point
    * render the widget template with the settings form the database
    * redirect to the help page if there is no appInstance
    */
    $app->addRoute('widget', function($request){
        if(!$request->appInstance){ return $request->controller->route('help'); }
        echo Template::render('views/widget.php', Settings::getInstance()->getSettings($request->appInstance) );
    });

    /**
     * Settings end point
     * render the settings template with the settings form the database
     * set user cookie with the instanceId of the app
     */
    $app->addRoute('settings', function($request) {
        echo Template::render('views/settings.php', Settings::getInstance()->getSettings($request->appInstance) );
    });

    /**
     * Update settings end point
     * saves the new settings to the database
     */
    $app->addRoute('settingsupdate', function($request) {
        Settings::getInstance()->updateSettings($request->appInstance);
    });

    /**
     * Help end point
     * render the help page
     */
    $app->addRoute('help', function($request) {
        echo Template::render('views/help.php');
    });

    /**
     * 404 end point
     * render the 404 page
     */
    $app->addRoute('404', function($request) {
        echo '<h1>404</h1>';
    });

    /**
    * start the handling the request
    */

$app->route();
