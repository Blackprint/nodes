/**
 * Get the first value of an array and remove it from the array
 * Make sure to use route cable when using this to avoid logic error
 * @summary Get first value and remove it
 * @blackprint node
 */
Blackprint.registerNode('Data/Array/Pop',
class extends Blackprint.Node {
	static input = {
		Array: Array,
	};

	static output = {
		Value: Blackprint.Types.Any,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Shift an Array";

		this._toast = new NodeToast(this);
	}

	update(){
		let { Input, Output } = this.ref;
		let val = Input.Array;

		if(val == null || val.length === 0)
			return this._toast.warn("Empty array");

		Output.Value = val.shift();
	}
});