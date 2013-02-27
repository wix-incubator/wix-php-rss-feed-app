<?php

require_once 'server/BaseController.php';

class Controller extends BaseController {

    function getEndPoint() {
        $uri = parent::getEndPoint();
        $parts = explode('/', $uri);
        $path = array_pop($parts);
        return $path ? $path : 'help';
    }

    function route($path=''){
        try {
            parent::route($path != '' ? $path : self::getEndPoint());
        } catch (Exception $e) {
            parent::route('help');
        }
    }

}

