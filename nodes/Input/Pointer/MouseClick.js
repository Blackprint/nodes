Blackprint.registerNode('Input/Pointer/MouseClick',
class MouseNode extends Blackprint.Node {
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
		Left: Boolean,
		Middle: Boolean,
		Right: Boolean,
		"4th": Boolean,
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
	}

	init(){
		this.update();
		this.iface.on('cable.disconnect', ({port}) => port.name === 'Element' && this.update());
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