<?php

class AuthenticationResolver {

    private static $APP_SECRET = 'bab8c074-07e3-4030-be4c-39c10c3cd8b5';

    private static function getInstanceFromRequest() {
        $instance = isset($_GET['instance']) ? $_GET['instance'] : '';
        if (!$instance) {
            $instance = isset($_COOKIE['instance']) ? $_COOKIE['instance'] : '';
        }
        return $instance;
    }

    private static function getCompIdFromRequest() {
        $compId = isset($_REQUEST['origCompId']) ? $_REQUEST['origCompId'] : '';
        if($compId != ''){return $compId;}
        return  isset($_REQUEST['compId']) ? $_REQUEST['compId'] : '';
    }

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


class AppInstance{
    private  $params;

    // '{"instanceId":"12e5d13b-f866-90ce-b3c4-1a2a9d0197c1","signDate":"2013-02-24T10:48:37.894-06:00","uid":"f447eec1-c011-4a17-b239-23d605c5ae7c","permissions":"OWNER","ipAndPort":"91.199.119.254/63738","vendorProductId":null,"demoMode":false}'
    function __construct($jsonData, $compId, $instance) {
        $params = json_decode(base64_decode($jsonData), true);
        $this->params = $params !== null ? $params : array();
        $this->params['compId'] = $compId;
        $this->params['instance'] = $instance;
    }

    function __get($name){
        return isset($this->params[$name]) ? $this->params[$name] : null;
    }

}
