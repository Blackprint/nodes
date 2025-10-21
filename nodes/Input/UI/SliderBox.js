/**
 * User Interface for handling number input with a horizontal slider
 * @blackprint node
 */
Blackprint.registerNode('Input/UI/SliderBox',
class SliderBoxNode extends Blackprint.Node {
	static output = {
		/** You can also right click to create a new port */
		"0": Blackprint.Port.Default(Number, 0),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Input/UI/SliderBox');
		iface.title = 'Slider Box';
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

			let key = i+'';

			// Because it object property, we need to cast as string
			var val = data[key];

			// Assign object values into data
			Object.assign(iface.data[i], val);

			// Add new port and set current port value
			node.createPort('output', i, Number);
			node.output[key] = val.value;
		}
	}

	// Callback when all nodes in container was loaded
	init(){
		let node = this;
		let iface = this.iface;

		// Put this array here, and reuse when port menu event
		var portMenu = [{
			title:"Create port", callback(){
				// Always create on last position -> (key, default value)
				node.createPort('output', iface.data.length, Number);
				iface.createPort();
			}
		}, {
			title:"Delete last port", callback(){
				var length = iface.data.length;
				if(length === 1)
					return;

				node.deletePort('output', length - 1);
				iface.data.pop();
			}
		}];

		iface.on('port.menu', Context.EventSlot, function({ port, menu }){
			for (var i = 0; i < portMenu.length; i++) {
				// Change every callback context to refer current port
				let temp = portMenu[i];

				temp.context = port;
				menu.push(temp);
			}
		});
	}

	syncIn(evName, data){
		if(evName === 'data'){
			let iface = this.iface;
			Object.assign(iface.data, data);

			for (var i = 0; i < data.length; i++) {
				iface.changed(i, data[i].value);
			}
		}
	}
});

// Save it on Context, so we can also access it from .sf files
Blackprint.registerInterface('BPIC/Input/UI/SliderBox',
Context.IFace.SliderBoxIFace = class SliderBoxIFace extends Blackprint.Interface {
	constructor(node){
		super(node);

		this.focusIndex = void 0;
		this.data = [];
		this.createPort(); // port: 0
	}

	changed(index, val){
		let node = this.node;
		node.output[index] = val;
		node.routes.routeOut();

		// Already throttled before being send to remote
		node.syncOut('data', this.data);
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

		let iface = this._iface;

		// Wait until the data has been changed
		clearTimeout(this._wait);
		this._wait = setTimeout(()=> iface.changed(iface.focusIndex, now), 1);

		// Let editor know if this iface changed and unsaved
		this.node.notifyEditorDataChanged();

		return now;
	}

	createPort(){
		this.data.push({
			value: 0,
			min: -100,
			max: 100,
			step: 0.1,
			_iface: this, // For reference in valueListener

			// Listener if value changed
			on$value: this.valueListener,
		});

		// Let editor know if this iface changed and unsaved
		this.node.notifyEditorDataChanged();
	}
});