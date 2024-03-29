/** 
 * Listen to mouse scroll event
 * Make sure to turn on AllowResync if you need to reupdate other node
 * @blackprint node
 */
Blackprint.registerNode('Input/Pointer/MouseScroll',
class MouseScrollNode extends Blackprint.Node {
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
		/** Raw event on pressed */
		Event: Blackprint.Port.StructOf(Event, {
			/** Horizontal scroll */
			X: {type: Number, field: 'deltaX'},
			/** Vertical scroll (middle mouse scroll) */
			Y: {type: Number, field: 'deltaY'},
			/** Z-axis scroll */
			Z: {type: Number, field: 'deltaZ'},
		}),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = 'Mouse Scroll Event';
		iface.description = 'Listening to window';
		iface.type = 'event';

		this.enabled = true;
	}

	init(){
		this.update();
		this.iface.on('cable.disconnect', ({port}) => {
			if(port.name === 'Element'){
				this.update();
				this.routes.routeOut();
			}
		});
	}

	update(){
		let { Input } = this.ref;

		if(this._onScroll != null){
			$(this._onScrollEl ?? allWindow).off('wheel', this._onScroll);
			this._onScrollEl = null;
		}

		this._onScroll = ev => this.onScroll(ev);
		let el = Input.Element ?? allWindow;

		if(el === allWindow)
			this.iface.description = 'Listening to window';
		else this.iface.description = 'Listening to element';

		if(!this.enabled){
			this.iface.description = 'Not listening';
			return;
		}

		$(el).on('wheel', this._onScroll);
		this._onScrollEl = el;
	}

	_onScroll = null;
	_onScrollEl = null;
	onScroll(ev, _isSync){
		// Avoid receiving event from other window
		if(ev.view !== window) return;

		this.ref.Output.Event = ev;
		this.routes.routeOut();

		if(!_isSync) this.syncOut('wheel', {
			dx: ev.deltaX,
			dy: ev.deltaY,
			dz: ev.deltaZ,
			dm: ev.deltaMode,
		});
	}

	syncIn(which, data){
		this.onScroll(new WheelEvent('wheel', {
			deltaX: data.dx,
			deltaY: data.dy,
			deltaZ: data.dz,
			deltaMode: data.dm,
		}), true);
	}

	destroy(){
		if(this._onScroll != null){
			$(this._onScrollEl ?? allWindow).off('wheel', this._onScroll);
			this._onScrollEl = null;
		}
	}
});