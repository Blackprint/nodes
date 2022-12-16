/**
 * Find item index from an array
 * @summary Find item index from an array
 * @blackprint node
 */
Blackprint.registerNode('Data/Array/Push',
class extends Blackprint.Node {
	static input = {
		Array: Array,
		Item: Blackprint.Types.Any,
	};
	
	static output = {
		Index: Number,
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

		Output.Index = val.indexOf(Input.Item);
	}
});