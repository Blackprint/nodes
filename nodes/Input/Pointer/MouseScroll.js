Blackprint.registerNode('Input/Pointer/MouseScroll',
class MouseScrollNode extends Blackprint.Node {
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
		Event: Event,
		X: Number,
		Y: Number,
		Z: Number,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = 'Mouse Scroll Event';
		iface.description = 'Listening to window';
		iface.type = 'event';

		this.enabled = true;
	}

	_onScroll = null;
	_onScrollEl = null;
	onScroll(ev){
		let { Output, IOutput } = this.ref;

		Output.X = ev.deltaX;
		Output.Y = ev.deltaY;
		Output.Z = ev.deltaZ;

		Output.Event = ev;

		// Reset value but don't trigger any event
		IOutput.X.value = 0;
		IOutput.Y.value = 0;
		IOutput.Z.value = 0;
	}

	init(){
		this.update();
		this.iface.on('cable.disconnect', ({port}) => port.name === 'Element' && this.update());
	}

	update(){
		let { Input } = this.ref;

		if(this._onScroll != null){
			$(this._onScrollEl ?? sf.Window).off('wheel', this._onScroll);
			this._onScrollEl = null;
		}

		this._onScroll = ev => this.onScroll(ev);
		let el = Input.Element ?? sf.Window;

		if(el === sf.Window)
			this.iface.description = 'Listening to window';
		else this.iface.description = 'Listening to element';

		if(!this.enabled){
			this.iface.description = 'Not listening';
			return;
		}

		$(el).on('wheel', this._onScroll);
		this._onScrollEl = el;
	}

	destroy(){
		if(this._onScroll != null){
			$(this._onScrollEl ?? sf.Window).off('wheel', this._onScroll);
			this._onScrollEl = null;
		}
	}
});