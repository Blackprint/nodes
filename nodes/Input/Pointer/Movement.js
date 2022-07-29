/** 
 * Listen to mouse scroll event
 * Make sure to turn on AllowResync if you need to reupdate other node
 * @blackprint node
 */
Blackprint.registerNode('Input/Pointer/Movement',
class PointerMovementNode extends Blackprint.Node {
	static input = {
		/** If this not connected to anything, this node will listen to window */
		Element: HTMLElement,
		/** Start listening to mouse click event */
		Listen: Blackprint.Port.Trigger(function(){
			this.enabled = true;
			this.update();
		}),
		/** Stop listener */
		Unlisten: Blackprint.Port.Trigger(function(){
			this.enabled = false;
			this.update();
		}),
	};

	static output = {
		/** Raw event on pressed */
		Event: Blackprint.Port.StructOf(Event, {
			/** Total X-axis movement after the previous 'pointermove' event */
			MoveX: {type: Number, field: 'moveX'},
			/** Total Y-axis movement after the previous 'pointermove' event */
			MoveY: {type: Number, field: 'moveY'},
			/** Pointer X-axis coordinate in local (DOM content) */
			ClientX: {type: Number, field: 'clientX'},
			/** Pointer Y-axis coordinate in local (DOM content) */
			ClientY: {type: Number, field: 'clientY'},
			/** Pointer X-axis coordinate in global (screen) */
			ScreenX: {type: Number, field: 'screenX'},
			/** Pointer Y-axis coordinate in global (screen) */
			ScreenY: {type: Number, field: 'screenY'},
		}),
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
		this.ref.Output.Event = ev;
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