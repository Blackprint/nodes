/**
 * Insert item on array at index
 * @summary Insert item on array at index
 * @blackprint node
 */
Blackprint.registerNode('Data/Array/Insert',
class extends Blackprint.Node {
	static input = {
		Array: Array,
		Index: Number,
		Item: Blackprint.Types.Any,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Insert";

		this._toast = new NodeToast(this);
	}

	update(){
		let { Input, Output } = this.ref;
		let val = Input.Array;

		if(val == null || Input.Index == null)
			return this._toast.warn("Array or Index must not be null");

		if(Input.Item == null)
			return this._toast.warn("Item must not be null");

		val.splice(Input.Index, 0, Input.Item);
	}
});