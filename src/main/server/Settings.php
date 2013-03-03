<?php


require_once 'framework/DbTable.php';

/**
 * Settings Singleton Class used for the settings CRUD
 * handle saving and retrieving the widget setting form the database
 */

class Settings extends DbTable {
    private static $instance;
    protected $db;

    /**
     * setup tables columns
     */
    protected function __construct() {
        parent::__construct('settings', array(
                'instanceId'=>array(),
                'settings'=>array())
        );
    }

    /**
     * @return Settings instance
     */
    public static function getInstance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * used to check if a widget settings exist in the database
     * @param $instanceId
     * @return bool
     */
    function isSettingsExist($instanceId) {
        if(!$instanceId){return false;}
        $settings =  $this->select('settings', 'where instanceId=?', array($instanceId));
        if(empty($settings)){
            return false;
        }
        return true;
    }

    /**
     * retrieve the widget settings
     * @param $appInstance
     * @return array|mixed
     */
    function getSettings($appInstance) {
        $defaults = array('settings' => '{}');
        if(!$appInstance){return $defaults;}
        $settings =  $this->select('settings', 'where instanceId=?', array($appInstance->instanceId .':'.$appInstance->compId));
        if(empty($settings)){ return $defaults; }
        return json_decode( $settings[0]->settings , true);
    }

    /**
     * atomic save of the widget settings
     * @param $appInstance
     */
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
