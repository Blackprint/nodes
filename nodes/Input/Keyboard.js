/**
 * Listen to keyboard event
 * You can also listen to specific keyboard key by right clicking the output port
 * Make sure to turn on AllowResync if you need to reupdate other node
 * @blackprint node
 */
Blackprint.registerNode('Input/Keyboard',
class KeyboardNode extends Blackprint.Node {
	static input = {
		/** If this not connected to anything, this node will listen to window */
		Element: HTMLElement,
		/** Start listening to mouse click event */
		Listen: Blackprint.Port.Trigger(function({ iface }){
			let node = iface.node;
			node.enabled = true;
			node.update();
		}),
		/** Stop listener */
		Unlisten: Blackprint.Port.Trigger(function({ iface }){
			let node = iface.node;
			node.enabled = false;
			node.update();
		}),
	};

	static output = {
		/** Raw event on button pressed */
		Pressed: KeyboardEvent,
		/** Raw event on button released */
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

		// Avoid receiving event from other window
		if(ev.view !== window) return;

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

		if(this.routes.out != null) this.routes.routeOut();
	}

	initPorts(data){
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

			$(allWindow).off('keydown', node._waiting);
			node._waiting = null;
		}

		this._waiting.toast = toast;
		$(allWindow).on('keydown', this._waiting);
	}

	init(){
		this.update();
		let node = this;
		let iface = this.iface;
		let { keys } = iface.data;

		// Put this array here, and reuse when port menu event
		var portMenu = [{
			title:"Create new port", callback(){
				if(node._waiting != null) return;

				let iPort = node.createPort('output', '[?]', Boolean);
				node.waitKeyToBeListened(iPort);

				// Let editor know if this iface changed and unsaved
				node.notifyEditorDataChanged();
			}
		}, {
			title:"Change this port", callback(){
				let i = keys.indexOf(this.name);
				if(i !== -1) keys.splice(i, 1);

				node.renamePort('output', this.name, '[?]');
				node.waitKeyToBeListened(this);

				// Let editor know if this iface changed and unsaved
				node.notifyEditorDataChanged();
			}
		}, {
			title:"Delete this port", callback(){
				if(node._waiting != null){
					$(allWindow).off('keydown', node._waiting);

					node._waiting.toast.destroy();
					node._waiting = null;

					if(this.name !== '[?]')
						node.removePort('output', '[?]');
				}

				node.deletePort('output', this.name);

				let i = keys.indexOf(this.name);
				if(i !== -1) keys.splice(i, 1);

				// Let editor know if this iface changed and unsaved
				node.notifyEditorDataChanged();
			}
		}];

		iface.on('port.menu', Context.EventSlot, function({ port, menu }){
			if(port.source !== 'output')
				return;

			let addMenu;
			if(port.name === 'Pressed' || port.name === 'Released')
				addMenu = [portMenu[0]];
			else addMenu = portMenu.slice(0);

			for (var i = 0; i < addMenu.length; i++) {
				// Change every callback context to refer current port
				addMenu[i].context = port;
			}

			menu.push(...addMenu);
		});

		iface.on('cable.disconnect', ({port}) => port.name === 'Element' && this.update());
	}

	update(){
		let { Input } = this.ref;

		if(this._onKeyboard != null){
			$(this._onKeyboardEl ?? allWindow)
				.off('keydown', this._onKeyboard)
				.off('keyup', this._onKeyboard);

			this._onKeyboardEl = null;
		}

		this._onKeyboard = ev => this.onKeyboard(ev);
		let el = Input.Element ?? allWindow;

		if(el === allWindow)
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
			$(this._onKeyboardEl ?? allWindow)
				.off('keydown', this._onKeyboard)
				.off('keyup', this._onKeyboard);

			this._onKeyboardEl = null;
		}
	}
});