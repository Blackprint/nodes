/**
 * Get array length
 * @summary Get array length
 * @blackprint node
 */
Blackprint.registerNode('Data/Array/Length',
class extends Blackprint.Node {
	static input = {
		Array: Array,
	};

	static output = {
		Length: Number,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Get Length";

		this._toast = new NodeToast(this);
	}

	update(){
		let { Input, Output } = this.ref;
		let val = Input.Array;

		if(val == null)
			return this._toast.warn("Array must not be null");

		Output.Length = Input.Array.Length;
	}
});