<?php

    require_once 'server/AuthenticationResolver.php';
    require_once 'server/Settings.php';
    require_once 'server/Template.php';
    require_once 'server/Controller.php';


    $app = new Controller();

    $app->beforeAll(function($request) {
        $request->appInstance = AuthenticationResolver::getAppInstance();
    });

    $app->addRoute('widget', function($request){
        if(!$request->appInstance){ return $request->controller->route('help'); }
        echo Template::render('views/widget.php', Settings::getInstance()->getSettings($request->appInstance) );
    });

    $app->addRoute('settings', function($request) {
        setcookie( "instance", $request->appInstance->instance, time()+60*60*24);
        echo Template::render('views/settings.php', Settings::getInstance()->getSettings($request->appInstance) );
    });

    $app->addRoute('settingsupdate', function($request) {
        Settings::getInstance()->updateSettings($request->appInstance);
    });

    $app->addRoute('help', function($request) {
        echo Template::render('views/help.php');
    });

    $app->addRoute('404', function($request) {
        echo '<h1>404</h1>';
    });

    $app->route();
