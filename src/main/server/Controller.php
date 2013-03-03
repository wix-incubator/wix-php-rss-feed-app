<?php

require_once 'framework/BaseController.php';

/**
 * Base controller & router
 * used to control the flow of incoming requests to the app
 */
class Controller extends BaseController {
    /**
     * Override the base end point getter to fallback to the help page
     * @return mixed|string
     */
    function getEndPoint() {
        $uri = parent::getEndPoint();
        $parts = explode('/', $uri);
        $path = array_pop($parts);
        return $path ? $path : 'help';
    }

    /**
     * route incoming request to the right function
     * @param string $path
     */
    function route($path=''){
        try {
            parent::route($path != '' ? $path : self::getEndPoint());
        } catch (Exception $e) {
            parent::route('help');
        }
    }

}

