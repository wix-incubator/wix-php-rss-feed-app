<?php

class DbConnection {

    private static $instance;
    private $db;

    private function __construct() {
        try {
            $this->db = new PDO('sqlite:db/widgets.sqlite3');
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'DB Error!';
            die();
        }
    }

    public static function getInstance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->db;
    }

}

class DbTable {

    protected $db;
    protected $table;
    protected $tableCols;

    protected function __construct($tbName, $tbCollDef) {
        $this->db = DbConnection::getInstance()->getConnection();
        $this->table = $tbName;
        $this->tableCols = $tbCollDef;
    }

    protected function getBy($key, $val, $limit = 1) {
        return $this->select('*', "WHERE $key=?", $val, $limit);
    }

    protected function insertRow(/* $arguments */) {
        return $this->create(implode(',', array_keys($this->tableCols)), func_get_args());
    }

    protected function updateRow(/* $arguments */) {
        return $this->update(implode(',', array_keys($this->tableCols)), func_get_args());
    }

    protected function query($query, $args = array()) {
        $sth = $this->db->prepare($query);
        if (!is_array($args)) {
            $args = explode(',', $args);
        }
        $sth->execute($args);
        return $sth;
    }

    protected function select($props = '*', $where = '', $args = array(), $limit = 1) {
        $limit = $limit > 0 ? ($limit + 0) : 1;
        return $this->query("SELECT $props FROM " . $this->table . " $where LIMIT $limit", $args)->fetchAll(PDO::FETCH_OBJ);
    }

    protected function update($props = '*', $where = '', $args = array()) {
        return $this->query("UPDATE " . $this->table . " SET $props $where", $args)->rowCount();
    }

    protected function delete($where = '', $args = array()) {
        return $this->query("DELETE FROM " . $this->table . " $where", $args)->rowCount();
    }

    protected function create($props, $args = array()) {
        $qMarks = implode(',', array_map(function() {
                            return '?';
                        }, explode(',', $props)));
        $this->query("INSERT INTO " . $this->table . " ($props) VALUES ($qMarks)", $args);
        $lastInsertId = $this->db->lastInsertId();
        return $lastInsertId > 0 ? $lastInsertId : false;
    }

}
