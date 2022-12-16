/**
 * Add data to an array, the data will be inserted from first index
 * Make sure to use route cable when using this to avoid logic error
 * @summary Insert data from first index
 * @blackprint node
 */
Blackprint.registerNode('Data/Array/Unshift',
class extends Blackprint.Node {
	static input = {
		Array: Array,
		Data: Blackprint.Types.Any,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Unshift to Array";

		this._toast = new NodeToast(this);
	}

	update(){
		let { Input } = this.ref;
		let val = Input.Array;

		if(val == null)
			return this._toast.warn("Array must not be null");

		val.unshift(Input.Data);
	}
});