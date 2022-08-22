/** 
 * Listen to mouse, pointer, or touch click event
 * Make sure to turn on AllowResync if you need to reupdate other node
 * @blackprint node
 */
Blackprint.registerNode('Input/Pointer/MouseClick',
class MouseNode extends Blackprint.Node {
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
		Pressed: Blackprint.Port.Union([PointerEvent, TouchEvent, MouseEvent]),
		/** Raw event on button released */
		Release: Blackprint.Port.Union([PointerEvent, TouchEvent, MouseEvent]),
		/** Mouse's left click, pointer/touch tap */
		Left: Boolean,
		/** Mouse's middle click */
		Middle: Boolean,
		/** Mouse's right click */
		Right: Boolean,
		/** Gaming mouse's 4th button */
		"4th": Boolean,
		/** Gaming mouse's 5th button */
		"5th": Boolean,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = 'Mouse Click Event';
		iface.description = 'Listening to window';
		iface.type = 'event';

		this.enabled = true;
	}

	_onClick = null;
	_onClickEl = null;
	onClick(ev){
		let { Output } = this.ref;

		if(ev.type === 'pointerup'){
			Output.Release = ev;

			if(ev.button === 0)
				Output.Left = false;
			else if(ev.button === 1)
				Output.Middle = false;
			else if(ev.button === 2)
				Output.Right = false;
			else if(ev.button === 3)
				Output["4th"] = false;
			else if(ev.button === 4)
				Output["5th"] = false;
		}
		else if(ev.type === 'pointerdown'){
			Output.Pressed = ev;

			if(ev.button === 0)
				Output.Left = true;
			else if(ev.button === 1)
				Output.Middle = true;
			else if(ev.button === 2)
				Output.Right = true;
			else if(ev.button === 3)
				Output["4th"] = true;
			else if(ev.button === 4)
				Output["5th"] = true;
		}

		this.routes.routeOut();
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

		if(this._onClick != null){
			let el = $(this._onClickEl ?? sf.Window);

			el.off('pointerdown', this._onClick)
				.off('pointerup', this._onClick);

			this._onClickEl = null;
		}

		this._onClick = ev => this.onClick(ev);
		let el = Input.Element ?? sf.Window;

		if(el === sf.Window)
			this.iface.description = 'Listening to window';
		else this.iface.description = 'Listening to element';

		if(!this.enabled){
			this.iface.description = 'Not listening';
			return;
		}

		$(el).on('pointerdown', this._onClick)
			.on('pointerup', this._onClick);

		this._onClickEl = el;
	}

	destroy(){
		if(this._onClick != null){
			let el = $(this._onClickEl ?? sf.Window);

			el.off('pointerdown', this._onClick)
				.off('pointerup', this._onClick);

			this._onClickEl = null;
		}
	}
});