<?php

/**
 * AuthenticationResolver class
 * 
 * This class handles the work of authenticating incoming request to pour server.
 * It gurantees that all requests are sent from wix by validating the incoming instance parameter.
 *
 * See the details here - http://dev.wix.com/docs/display/DRAF/Using+the+Signed+App+Instance#UsingtheSignedAppInstance-PHP
 */
class AuthenticationResolver {
    /**
     * @var string YOUR APP SECRET SHOULD REPLACE THIS ONE
     */
    private static $APP_SECRET = 'bab8c074-07e3-4030-be4c-39c10c3cd8b5'; 

    /**
     * get the instance param from the url
     *
     * @return string
     */
    private static function getInstanceFromRequest() {
        $instance = isset($_REQUEST['instance']) ? $_REQUEST['instance'] : '';
        if (!$instance) {
            $instance = isset($_COOKIE['instance']) ? $_COOKIE['instance'] : '';
        }
        return $instance;
    }

    /**
     * get the compId from the url params
     * settings page sends the compId as origCompId
     *
     * @return string
     */
    private static function getCompIdFromRequest() {
        $compId = isset($_REQUEST['origCompId']) ? $_REQUEST['origCompId'] : '';
        if($compId != ''){return $compId;}
        return  isset($_REQUEST['compId']) ? $_REQUEST['compId'] : '';
    }

    /**
     * validate the request digital signature
     *
     * @return AppInstance|bool
     */
    static function getAppInstance() {

        $instance = self::getInstanceFromRequest();
        $compId = self::getCompIdFromRequest();

        if (!$instance) { return false; }

        list($code, $data) = explode('.', $instance);

        if (base64_decode(strtr($code, "-_", "+/")) != hash_hmac("sha256", $data, self::$APP_SECRET, TRUE)) {
            return false;
        }
        return new AppInstance($data, $compId, $instance);
    }
}

/**
 * AppInstance Class
 *
 * used to hold the state of the request
 */
class AppInstance {
    private  $params;

    /**
     * Class constructor
     *
     * @param $jsonData
     * @param {String} $compId
     * @param {String} $instance
     */
    function __construct($jsonData, $compId, $instance) {
        $params = json_decode(base64_decode($jsonData), true);
        $this->params = $params !== null ? $params : array();
        $this->params['compId'] = $compId;
        $this->params['instance'] = $instance;
    }

    /**
     * Magic getter for all class members
     *
     * @param $name
     * @return null|string
     */
    function __get($name){
        return isset($this->params[$name]) ? $this->params[$name] : null;
    }

}
