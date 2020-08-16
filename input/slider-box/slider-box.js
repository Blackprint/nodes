// To be used for Visual and Standalone
// As we don't call any Browser API
class UIControl extends Blackprint.Node{
	// Called by ScarletsFrame for when constructing new component
	// 'this' already using the 'UIControl' class
	static construct(){
		var node = this;
		node.focusIndex = void 0;

		node.options = [{
			value: 0,
			min: 0,
			max: 10,
			step: 0.1,
			$node:this, // For reference in valueListener

			// Listener if value changed
			on$value: this.valueListener,
		}];
	}

	// Put this here to reduce memory usage because function creation
	// And reuse it on every node.options's item
	valueListener(old, now){
		// 'this' == current object item

		if(now > this.max)
			now = this.max;
		else if(now < this.min)
			now = this.min;
		else // Fix floating point
			now = Math.round(now*100)/100;

		this.$node.changed && this.$node.changed(this.$node.focusIndex, now);
		return now;
	}

	createPort(){
		this.options.push({
			value: 0,
			min: 0,
			max: 10,
			step: 0.1,
			$node:this, // For reference in valueListener

			// Listener if value changed
			on$value: this.valueListener,
		});
	}

	deleteLastPort(){
		this.options.pop();
	}

	dragMove(ev, item){
		function onMove(ev){
			item.value += item.step * ev.movementX;
		}

		var that = this;

		$(document)
		.on('pointermove', onMove)
		.once('pointerup', {capture:true}, function(ev2){
			$(document).off('pointermove', onMove);

			if(ev2.timeStamp - ev.timeStamp < 100)
				$('input', that.options.getElement(item)).focus();
		});

		// ToDo: fix framework and use 'key' instead of indexOf
		this.focusIndex = this.options.indexOf(item);
	}

	mouseWheel(ev, item){
		item.value -= item.step * Math.sign(ev.deltaY);
		this.focusIndex = this.options.indexOf(item);
	}
}

// == Handler ==
// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('input/slider-box', function(handle, node){
	node.title = 'Slider Box';
	node.type = 'slider-box';

	handle.outputs = {
		"0": 0
	};

	node.changed = function(index, val){
		handle.outputs[index] = val;
	}

	// Callback when this single node was loaded
	// Lets handle saved options
	handle.imported = function(options){
		if(options === void 0)
			return;

		// Assign the first one
		Object.assign(node.options[0], options['0']);

		// Set current port value
		handle.outputs['0'] = options['0'].value;

		var length = objLength(options);
		if(length === 1)
			return;

		// Create new port handler if options is more than one
		for (var i = 1; i < length; i++){
			// Equal to 'node.options.push({...})'
			node.createPort();

			// Because it object property, we need to cast as string
			var val = options[i+''];

			// Assign object values into options
			Object.assign(node.options[i], val);

			// Add new port and set current port value
			handle.outputs.add(i, val.value);
		}
	}

	// Callback when all nodes in container was loaded
	handle.init = function(){
		// Put this array here, and reuse when port menu event
		var portMenu = [{
			title:"Create port", context:null, callback:function(){
				// Always create on last position -> (key, default value)
				handle.outputs.add(node.options.length, 0);
				node.createPort();
			}
		}, {
			title:"Delete last port", context:null, callback:function(){
				var length = node.options.length;
				if(length === 1)
					return;

				handle.outputs.delete(length - 1);
				node.deleteLastPort();
			}
		}];

		node.on('port.menu', function(obj){
			for (var i = 0; i < portMenu.length; i++) {
				// Change every callback context to refer current port
				portMenu[i].context = obj.port;
				obj.menu.push(portMenu[i]);
			}
		});
	}
});

// == Blackprint Visual Interpreter ==
// For Browser
Blackprint.registerInterface('slider-box', {
	extend: UIControl,
	template: 'BPAO/Input/slider-box/slider-box.html'
});

// == For Standalone Interpreter ==
// For Non-browser
Blackprint.Interpreter.registerInterface('slider-box', {
	extend: UIControl
});