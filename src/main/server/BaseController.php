<?php
	
class BaseController{
    private $routes = NULL;
    private $patternMap = array();
    private $beforeHandlers = array();
    private $afterHandlers = array();
    private $controllerRequest = NULL;

    function __construct($ctx = 'ControllerRequest'){
            $this->controllerRequest = $ctx;
    }

    function getEndPoint() {
        return $_SERVER['PATH_INFO'];
    }

    function addRoute($pattern, $handler){
		$pattern = '/^'.preg_replace('/(?<!\\\)(\/)/','\/', $pattern).'$/';
		$this->routes[] =  array('pattern' => $pattern, 'handler' => $handler);
		$this->patternMap[$pattern] = count($this->routes) - 1;
    }

    function beforeAll($fun){
        $this->beforeHandlers[] = $fun;
    }

    function afterAll($fun){
        $this->afterHandlers[] = $fun;
    }

    function route($uri){
        foreach ($this->patternMap as $pat => $route_name){
            if (preg_match($pat, $uri, $groups)){

                $groups[0] = new $this->controllerRequest($this, $uri);

                $response = $this->callBeforeHandlers($groups);
                if ($response) {
                    $groups[0] = $response;
                }
				
				$route = $this->routes[$route_name];
				
				if (is_callable( $route['handler'] )){
					$handler_resp = call_user_func_array($route['handler'], $groups);
					if ($handler_resp) {
						$groups[0] = $handler_resp;
					}
					return $this->callAfterHandlers($groups);
                } else {
					throw new ControllerError("Malformed handler for route '$route_name'.");
                }
            }
        }
        throw new ControllerError('No pattern matched.');
    }

    private function callBeforeHandlers($args){
        foreach ($this->beforeHandlers as $fun){
            $resp = call_user_func_array($fun, $args);
            if ($resp) {
                $args[0] = $resp;
            }
        }
        return $args[0];
    }

    private function callAfterHandlers($args){
        foreach ($this->afterHandlers as $fun){
            $resp = call_user_func_array($fun, $args);
            if ($resp) {
                $args[0] = $resp;
            }
        }
        return $args[0];
    }
}

class ControllerRequest {
    public $uri = null;
    public $server = null;
    public $get = null;
    public $post = null;
    public $files = null;
    public $cookie = null;
    public $session = null;
    public $env = null;


    public function __construct($router, $uri = null) {
        $this->uri = $uri;
        $this->controller = $router;

        if (!empty($_SERVER)) {
            $this->server = $_SERVER;
        }

        if (!empty($_GET)) {
            $this->get = $_GET;
        }

        if (!empty($_POST)) {
            $this->post = $_POST;
        }

        if (!empty($_FILES)) {
            $this->files = $_FILES;
        }

        if (!empty($_COOKIE)) {
            $this->cookie = $_COOKIE;
        }

        if (!empty($_SESSION)) {
            $this->session = $_SESSION;
        }

        if (!empty($_ENV)) {
            $this->env = $_ENV;
        }
    }
}

class ControllerError extends Exception{}

?>
