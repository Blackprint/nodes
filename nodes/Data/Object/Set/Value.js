/**
 * Set value in an object
 * @blackprint node
 */
Blackprint.registerNode('Data/Object/Set/Value',
class extends Blackprint.Node {
	static input = {
		/** Object that will be manipulated */
		Object: Object,
		Field: String,
		Value: Blackprint.Types.Any,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Set Object Value";
		iface.description = 'Set value in an object';

		this._toast = new NodeToast(this);
	}

	update(){
		let { Input } = this.ref;

		if(!Input.Object || !Input.Field)
			return this._toast.warn("Object or Field can't be null or empty");

		Input.Object[Input.Field] = Input.Value;
	}
});