<?php

class PrettyDebugComponent extends Component {

	public $components = array('DebugKit.Toolbar');

	public function __construct(ComponentCollection $collection, $settings = array()) {
		parent::__construct($collection, array('priority' => 0) + $settings);
	}

	public function beforeRender(Controller $controller) {
		$toolbar = $this->Toolbar;
		$toolbar->css[] = 'PrettyDebug./css/pretty_debug.css';
		$toolbar->javascript[] = 'PrettyDebug./js/pretty_debug.js';
	}

}
