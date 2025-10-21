/**
 * Transverse a object with specified property to get its value inside
 * @summary Dive through object properties
 * @blackprint node
 */
Blackprint.registerNode('Data/Object/Get/Value',
class extends Blackprint.Node {
	static input = {
		/** Object to be transversed */
		Object: Object,
		/** Single narrow field to extract */
		Field: String,
	};
	static output = {
		/** Extracted value */
		Value: Blackprint.Types.Any
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Object/Get/Value');
		iface.title = "Get Object Value";

		this.hasFieldData = false;
		this.hasFieldCable = false;
	}

	init(){
		let { IInput, Output } = this.ref;

		// Let's remove data after the cable was disconnected
		IInput.Object.on('disconnect', Context.EventSlot, () => Output.Value = null);

		// Hide or unhide input box
		IInput.Field.on('disconnect', Context.EventSlot, () => this.hasFieldCable = false);
		IInput.Field.on('connect', Context.EventSlot, () => this.hasFieldCable = true);

		if(IInput.Field.default) this.hasFieldData = true;
	}

	update(){
		let { Input, Output } = this.ref;
		let { Object: Object_, Field } = Input;

		if(Object_ == null){
			this.hasFieldData = !!Field;
			return this.iface._toast.warn("Object can't be null or undefined");
		}

		if(!!Field){ // not null or empty
			this.iface._toast.clear();
			this.hasFieldData = true;
			Output.Value = Object_[Field];
			return;
		}
		else if(this.hasFieldCable){
			this.iface._toast.error("Field can't be empty string");
			this.hasFieldData = false;
			return;
		}
		// else use input box

		this.hasFieldData = false;

		let val = null;
		try{
			if(this._getter == null) return;
			val = this._getter(Object_);
		} catch(e) {
			if(e.message.includes === "Cannot read properties of"){
				Output.Value = null;
				return;
			}

			this.iface._toast.error(e.message);
		}

		Output.Value = val;
		this.iface._toast.clear();
	}

	imported(data){ Object.assign(this.iface.data, data) }

	recreateFunc(props){
		if(props === '')
			return this._getter = null;

		// ToDo: support symbol inside of quotes => props["my-props"]
		// Symbol outside of quotes is forbidden => props.myStuff().hello?.world
		// Currently this node will support => props.myStuff["hello"].world
		if(/[`~!@#$%^&*()\-=+{}|\\;:,<>/?]/.test(props))
			return this.iface._toast.error("Can't use symbol when destructuring properties");

		if(props.slice(0, 1) === '[')
			props = `_a_${props}`;
		else props = `_a_.${props}`;

		this.iface._toast.clear();

		try{
			this._getter = Function('_a_', 'return '+props);
		} catch(e) {
			if(e.message.includes('Unexpected token')){
				this.iface._toast.warn('...?');
				return;
			}
		}

		this.update();
	}

	// Remote sync in
	syncIn(id, data){
		if(id === 'props') this.iface.props = data;
	}
});

Blackprint.registerInterface('BPIC/Data/Object/Get/Value',
Context.IFace.GetValue = class extends Blackprint.Interface {
	constructor(node){
		super(node);
		this._toast = new NodeToast(this);

		this.data = new DataObjectGetValueData(this);
	}
});

class DataObjectGetValueData{
	#iface = null;
	#props = '';

	constructor(iface){
		this.#iface = iface;
		this.#props = '';
	}

	get props(){ return this.#props }
	set props(val){
		this.#props = val;
		let node = this.#iface.node;

		node.recreateFunc(val);
		node.syncOut('props', val);

		// Let editor know if this iface changed and unsaved
		node.notifyEditorDataChanged();
	}
}

// Using getter/setter will make the property not enumerable and Blackprint will skip that property when exporting
Blackprint.utils.setEnumerablePrototype(DataObjectGetValueData, {
	props: true,
});