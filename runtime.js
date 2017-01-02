// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.armaldio_vr = function (runtime) {
	this.runtime = runtime;
};

(function () {
	var pluginProto = cr.plugins_.armaldio_vr.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function (plugin) {
		this.plugin  = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function () {
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function (type) {
		this.type    = type;
		this.runtime = type.runtime;
	};

	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function () {
	};

	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections) {
		propsections.push({});
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {
	};

	Cnds.prototype.CookiesEnabled = function () {
	};


	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {
	};

	function c2THREEObject() {
		return new THREE.CSS3DObject(document.getElementById("c2canvasdiv"));
	}

	Acts.prototype.StartVR = function () {
		if (!Detector.webgl) Detector.addGetWebGLMessage();

		var camera, scene, scene2, renderer, renderer2, object, controls, effect;
		var fov = 50;

		init();
		animate();

		function init() {
			camera            = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
			camera.position.z = $("#c2canvas").height() / 2 / Math.tan(Math.PI * fov / 360);

			controls = new THREE.OrbitControls(camera);
			controls.rotateSpeed = 1.0;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;

			scene             = new THREE.Scene();
			//scene.add(camera);

			renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setClearColor(0x000, 1);
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.domElement.style.zIndex = 5;
			document.body.appendChild(renderer.domElement);

			effect = new THREE.StereoEffect(renderer);
			effect.setSize(window.innerWidth, window.innerWidth);

			scene2 = new THREE.Scene();

			object = c2THREEObject();
			scene2.add(object);

			camera.lookAt(object.position);

			renderer2 = new THREE.CSS3DRenderer();
			renderer2.setSize(window.innerWidth, window.innerHeight);
			renderer2.domElement.style.position = 'absolute';
			renderer2.domElement.style.top = 0;

			//$("body").replaceWith(renderer.domElement);
			document.body.appendChild(renderer2.domElement);
		}

		function animate() {
			requestAnimationFrame(animate);

			renderer2.render(scene2, camera);
			//renderer.render(scene, camera);
			effect.render(scene, camera);

			controls.update();

			$("#c2canvasdiv").css("margin-left", "0");

		}
	};

	/*
	 var leftPane = "<div id='leftPane' style='width: 50%'><canvas></canvas></div>";
	 var rightPane = "<div id='rightPane' style='width: 50%'><canvas></canvas></div>";

	 $("body").replaceWith(leftPane + rightPane);

	 $("#leftPane canvas").replaceWith(renderer.domElement);
	 $("#rightPane canvas").replaceWith(renderer.domElement);
	 */


	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {
	};

	Exps.prototype.URL = function (ret) {

	};

	pluginProto.exps = new Exps();

}());