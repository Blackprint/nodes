// To be used for Visual and Standalone
// As we don't call any Browser API
class UIControl extends Blackprint.Node {
	// Called by ScarletsFrame for when constructing new component
	// 'this' already using the 'UIControl' class
	static construct(){
		var iface = this;
		iface.focusIndex = void 0;

		iface.data = [{
			value: 0,
			min: -100,
			max: 100,
			step: 0.1,
			$iface:this, // For reference in valueListener

			// Listener if value changed
			on$value: this.valueListener,
		}];
	}

	// Put this here to reduce memory usage because function creation
	// And reuse it on every node.data's item
	valueListener(now){
		// 'this' == current object item

		if(now > this.max)
			now = this.max;
		else if(now < this.min)
			now = this.min;
		else // Fix floating point
			now = Math.round(now*100)/100;

		this.$iface.changed && this.$iface.changed(this.$iface.focusIndex, now);
		return now;
	}

	createPort(){
		this.data.push({
			value: 0,
			min: -100,
			max: 100,
			step: 0.1,
			$iface:this, // For reference in valueListener

			// Listener if value changed
			on$value: this.valueListener,
		});
	}

	deleteLastPort(){
		this.data.pop();
	}

	dragMove(ev, item){
		this.focusIndex = this.data.indexOf(item);
		function onMove(ev){
			item.value += item.step * ev.movementX;
		}

		var that = this;
		var doc = $(ev.view.document);

		doc.on('pointermove', onMove).once('pointerup', {capture:true}, function(ev2){
			doc.off('pointermove', onMove);

			if(ev2.timeStamp - ev.timeStamp < 100)
				$('input', that.data.getElements(item)).focus();
		});
	}

	mouseWheel(ev, item){
		this.focusIndex = this.data.indexOf(item);
		item.value -= item.step * Math.sign(ev.deltaY);
	}
}

// == Handler ==
// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('Input/SliderBox', function(node, iface){
	iface.title = 'Slider Box';
	iface.interface = 'BPAO/Input/SliderBox';

	node.outputs = {
		"0": 0
	};

	iface.changed = function(index, val){
		node.outputs[index] = val;
	}

	// Callback when this single node was loaded
	// Lets handle saved data
	node.imported = function(data){
		if(data === void 0)
			return;

		// Assign the first one
		Object.assign(iface.data[0], data['0']);

		// Set current port value
		node.outputs['0'] = data['0'].value;

		var length = objLength(data);
		if(length === 1)
			return;

		// Create new port handler if data is more than one
		for (var i = 1; i < length; i++){
			// Equal to 'iface.data.push({...})'
			iface.createPort();

			// Because it object property, we need to cast as string
			var val = data[i+''];

			// Assign object values into data
			Object.assign(iface.data[i], val);

			// Add new port and set current port value
			node.outputs.add(i, val.value);
		}
	}

	// Callback when all nodes in container was loaded
	node.init = function(){
		// Put this array here, and reuse when port menu event
		var portMenu = [{
			title:"Create port", context:null, callback(){
				// Always create on last position -> (key, default value)
				node.outputs.add(iface.data.length, 0);
				iface.createPort();
			}
		}, {
			title:"Delete last port", context:null, callback(){
				var length = iface.data.length;
				if(length === 1)
					return;

				node.outputs.delete(length - 1);
				iface.deleteLastPort();
			}
		}];

		iface.on('port.menu', function(port, menu){
			for (var i = 0; i < portMenu.length; i++) {
				// Change every callback context to refer current port
				portMenu[i].context = port;
				menu.push(portMenu[i]);
			}
		});
	}
});

// == Blackprint Visual Engine ==
// For Browser
Blackprint.registerInterface('BPAO/Input/SliderBox', UIControl);

// == For Standalone Engine ==
// For Non-browser
Blackprint.Engine.registerInterface('BPAO/Input/SliderBox', UIControl);