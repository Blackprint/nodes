/**
 * Transverse a object with specified property to get its value inside
 * @blackprint node
 */
Blackprint.registerNode('Data/Object/GetValue',
class extends Blackprint.Node {
	static input = { Object };
	static output = { Value: Blackprint.Types.Any };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Object/GetValue');
		iface.title = "Get Object Value";
		iface.description = 'Dive through object properties';
	}

	init(){
		let { Output } = this.ref;

		// Let's remove data after the cable was disconnected
		this.iface.on('cable.disconnect', Context.EventSlot, () => {
			Output.Value = null;
		});
	}

	update(){
		let { Input, Output } = this.ref;
		let val = null;

		try{
			if(this._getter == null) return;
			val = this._getter(Input.Object);
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

Blackprint.registerInterface('BPIC/Data/Object/GetValue',
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
	}
}

// Using getter/setter will make the property not enumerable and Blackprint will skip that property when exporting
Blackprint.utils.setEnumerablePrototype(DataObjectGetValueData, {
	props: true,
});