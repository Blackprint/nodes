/**
 * Check if item exist in an array
 * @summary Check if item exist in an array
 * @blackprint node
 */
Blackprint.registerNode('Data/Array/Contains',
class extends Blackprint.Node {
	static input = {
		Array: Array,
		Item: Blackprint.Types.Any,
	};

	static output = {
		Exist: Boolean,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "IndexOf";

		this._toast = new NodeToast(this);
	}

	update(){
		let { Input, Output } = this.ref;
		let val = Input.Array;

		if(val == null)
			return this._toast.warn("Array must not be null");

		Output.Exist = val.includes(Input.Item);
	}
});