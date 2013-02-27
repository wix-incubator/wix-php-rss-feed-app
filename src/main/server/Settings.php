<?php


require_once 'DbTable.php';

class Settings extends DbTable {
    private static $instance;
    protected $db;

    protected function __construct() {
        parent::__construct('settings', array(
                'instanceId'=>array(),
                'settings'=>array())
        );
    }

    public static function getInstance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    function isSettingsExist($instanceId) {
        if(!$instanceId){return false;}
        $settings =  $this->select('settings', 'where instanceId=?', array($instanceId));
        if(empty($settings)){
            return false;
        }
        return true;
    }

    function getSettings($appInstance) {
        $defaults = array('settings' => '{}');
        if(!$appInstance){return $defaults;}
        $settings =  $this->select('settings', 'where instanceId=?', array($appInstance->instanceId .':'.$appInstance->compId));
        if(empty($settings)){ return $defaults; }
        return json_decode( $settings[0]->settings , true);
    }

    function updateSettings($appInstance) {
        $postBody = file_get_contents('php://input');
        $data = json_decode($postBody);
        $instanceId = $appInstance->instanceId .':'.$data->compId;
        $settingsParams = array(
            ":settings" => $postBody,
            ":instanceId" => $instanceId
        );

        if($this->isSettingsExist($instanceId)){
            $this->update('settings = :settings', 'where instanceId LIKE :instanceId', $settingsParams);
        } else {
            $this->query('INSERT INTO '.$this->table.' (settings, instanceId) VALUES (:settings, :instanceId)', $settingsParams);
        }
    }
}
