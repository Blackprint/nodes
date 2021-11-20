Blackprint.registerNode('Input/SliderBox',
class SliderBoxNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Input/SliderBox');
		iface.title = 'Slider Box';

		this.output = {
			"0": Blackprint.Port.Default(Number, 0)
		};
	}

	// Callback when this single node was loaded
	// Lets handle saved data
	imported(data){
		if(data === void 0)
			return;

		let node = this;
		let iface = this.iface;

		// Assign the first one
		Object.assign(iface.data[0], data['0']);

		// Set current port value
		node.output['0'] = data['0'].value;

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
			node.output.add(i, val.value);
		}
	}

	// Callback when all nodes in container was loaded
	init(){
		let node = this;
		let iface = this.iface;

		// Put this array here, and reuse when port menu event
		var portMenu = [{
			title:"Create port", context:null, callback(){
				// Always create on last position -> (key, default value)
				node.output.add(iface.data.length, 0);
				iface.createPort();
			}
		}, {
			title:"Delete last port", context:null, callback(){
				var length = iface.data.length;
				if(length === 1)
					return;

				node.output.delete(length - 1);
				iface.data.pop();
			}
		}];

		iface.on('port.menu', function({ port, menu }){
			for (var i = 0; i < portMenu.length; i++) {
				// Change every callback context to refer current port
				let temp = portMenu[i];

				temp.context = port;
				menu.push(temp);
			}
		});
	}
});

// Save it on Context, so we can also access it from .sf files
Blackprint.registerInterface('BPIC/Input/SliderBox',
Context.IFace.SliderBoxIFace = class SliderBoxIFace extends Blackprint.Interface {
	constructor(node){
		super(node);

		// Constructor for Interface can be executed twice when using Cloned Container
		if(this.data !== void 0) return;

		this.focusIndex = void 0;
		this.data = [{
			value: 0,
			min: -100,
			max: 100,
			step: 0.1,
			$iface: this, // For reference in valueListener

			// Listener if value changed
			on$value: this.valueListener,
		}];
	}

	changed(index, val){
		this.node.output[index] = val;
	}

	// Put this here to reduce memory usage because of function creation
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
			$iface: this, // For reference in valueListener

			// Listener if value changed
			on$value: this.valueListener,
		});
	}
});