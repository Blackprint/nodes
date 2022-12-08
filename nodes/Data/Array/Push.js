/**
 * Add data to an array, the data will be placed on last index
 * Make sure to use route cable when using this to avoid logic error
 * @summary Add data at last index
 * @blackprint node
 */
Blackprint.registerNode('Data/Array/Push',
class extends Blackprint.Node {
	static input = {
		Array: Array,
		Data: Blackprint.Types.Any,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Push to Array";

		this._toast = new NodeToast(this);
	}

	update(){
		let { Input } = this.ref;
		let val = Input.Array;

		if(val == null)
			return this._toast.warn("Array must not be null");

		val.push(Input.Data);
	}
});