Blackprint.registerNode('Input/Keyboard',
class KeyboardNode extends Blackprint.Node {
	static input = {
		Element: HTMLElement,
		Listen: Blackprint.Port.Trigger(function(){
			this.enabled = true;
			this.update();
		}),
		Unlisten: Blackprint.Port.Trigger(function(){
			this.enabled = false;
			this.update();
		}),
	};

	static output = {
		Pressed: KeyboardEvent,
		Released: KeyboardEvent,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = 'Keyboard Event';
		iface.description = 'Listening to window';
		iface.type = 'event';
		iface.data = {keys: []};

		this.enabled = true;
	}

	_onKeyboard = null;
	_onKeyboardEl = null;
	onKeyboard(ev){
		let { Output } = this.ref;

		if(ev.type === 'keydown')
			Output.Pressed = ev;
		else if(ev.type === 'keyup')
			Output.Released = ev;

		if(ev.code in Output){
			if(ev.type === 'keydown')
				Output[ev.code] = true;
			else if(ev.type === 'keyup')
				Output[ev.code] = false;
		}
	}

	imported(data){
		let iface = this.iface;
		Object.assign(iface.data, data);

		let { keys } = iface.data;
		for (var i = 0; i < keys.length; i++)
			this.createPort('output', keys[i], Boolean);
	}

	waitKeyToBeListened(port){
		let node = this;
		let iface = this.iface;
		let { keys } = iface.data;

		let toast = iface.$decoration.warn("Press any key...");
		this._waiting = function(ev) {
			if(keys.includes(ev.code)){
				toast.text = 'The key is already being used';
				return;
			}

			let i = keys.indexOf('[?]');

			if(i !== -1) keys.splice(i, 1, ev.code);
			else keys.push(ev.code);

			node.renamePort('output', port.name, ev.code);
			toast.destroy();

			$(sf.Window).off('keydown', node._waiting);
			node._waiting = null;
		}

		this._waiting.toast = toast;
		$(sf.Window).on('keydown', this._waiting);
	}

	init(){
		this.update();
		let node = this;
		let iface = this.iface;
		let { keys } = iface.data;

		// Put this array here, and reuse when port menu event
		var portMenu = [{
			title:"Create new port", context:null, callback(){
				if(node._waiting != null) return;

				let iPort = node.createPort('output', '[?]', Boolean);
				node.waitKeyToBeListened(iPort);
			}
		}, {
			title:"Change this port", context:null, callback(){
				let i = keys.indexOf(this.name);
				if(i !== -1) keys.splice(i, 1);

				node.renamePort('output', this.name, '[?]');
				node.waitKeyToBeListened(this);
			}
		}, {
			title:"Delete this port", context:null, callback(){
				if(node._waiting != null){
					$(sf.Window).off('keydown', node._waiting);

					node._waiting.toast.destroy();
					node._waiting = null;

					if(this.name !== '[?]')
						node.removePort('output', '[?]');
				}

				node.deletePort('output', this.name);

				let i = keys.indexOf(this.name);
				if(i !== -1) keys.splice(i, 1);
			}
		}];

		iface.on('port.menu', Context.EventSlot, function({ port, menu }){
			if(port.source !== 'output')
				return;

			if(port.name === 'Event')
				portMenu.pop();

			for (var i = 0; i < portMenu.length; i++) {
				// Change every callback context to refer current port
				let temp = portMenu[i];

				temp.context = port;
				menu.push(temp);
			}
		});

		iface.on('cable.disconnect', ({port}) => port.name === 'Element' && this.update());
	}

	update(){
		let { Input } = this.ref;

		if(this._onKeyboard != null){
			$(this._onKeyboardEl ?? sf.Window)
				.off('keydown', this._onKeyboard)
				.off('keyup', this._onKeyboard);

			this._onKeyboardEl = null;
		}

		this._onKeyboard = ev => this.onKeyboard(ev);
		let el = Input.Element ?? sf.Window;

		if(el === sf.Window)
			this.iface.description = 'Listening to window';
		else this.iface.description = 'Listening to element';

		if(!this.enabled){
			this.iface.description = 'Not listening';
			return;
		}

		$(el).on('keydown', this._onKeyboard)
			.on('keyup', this._onKeyboard);

		this._onKeyboardEl = el;
	}

	destroy(){
		if(this._onKeyboard != null){
			$(this._onKeyboardEl ?? sf.Window)
				.off('keydown', this._onKeyboard)
				.off('keyup', this._onKeyboard);

			this._onKeyboardEl = null;
		}
	}
});