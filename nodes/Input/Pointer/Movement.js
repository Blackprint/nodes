Blackprint.registerNode('Input/Pointer/Movement',
class PointerMovementNode extends Blackprint.Node {
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
		MoveX: Number,
		MoveY: Number,
		ClientX: Number,
		ClientY: Number,
		ScreenX: Number,
		ScreenY: Number,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = 'Pointer Move Event';
		iface.description = 'Listening to window';
		iface.type = 'event';

		this.enabled = true;
	}

	_onMove = null;
	_onMoveEl = null;
	onMove(ev){
		let { Output, IOutput } = this.ref;

		Output.MoveX = ev.movementX;
		Output.MoveY = ev.movementY;
		Output.ClientX = ev.clientX;
		Output.ClientY = ev.clientY;
		Output.ScreenX = ev.screenX;
		Output.ScreenY = ev.screenY;

		// Reset value but don't trigger any event
		IOutput.MoveX.value = 0;
		IOutput.MoveY.value = 0;
	}

	init(){
		this.update();
		this.iface.on('cable.disconnect', ({port}) => port.name === 'Element' && this.update());
	}

	update(){
		let { Input } = this.ref;

		if(this._onMove != null){
			$(this._onMoveEl ?? sf.Window).off('pointermove', this._onMove);
			this._onMoveEl = null;
		}

		this._onMove = ev => this.onMove(ev);
		let el = Input.Element ?? sf.Window;

		if(el === sf.Window)
			this.iface.description = 'Listening to window';
		else this.iface.description = 'Listening to element';

		if(!this.enabled){
			this.iface.description = 'Not listening';
			return;
		}

		$(el).on('pointermove', this._onMove);
		this._onMoveEl = el;
	}

	destroy(){
		if(this._onMove != null){
			$(this._onMoveEl ?? sf.Window).off('pointermove', this._onMove);
			this._onMoveEl = null;
		}
	}
});