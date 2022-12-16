/**
 * Remove items start from an index from an array
 * @summary Remove items from an array
 * @blackprint node
 */
Blackprint.registerNode('Data/Array/RemoveAt',
class extends Blackprint.Node {
	static input = {
		Array: Array,
		Index: Number,
		DeleteCount: Blackprint.Port.Default(Number, 1),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "RemoveAt";

		this._toast = new NodeToast(this);
	}

	update(){
		let { Input } = this.ref;

		if(Input.Array == null || Input.Index == null || Input.DeleteCount == null)
			return this._toast.warn("Array, Index, or DeleteCount must not be null");

		Input.Array.splice(Input.Index, Input.DeleteCount);
	}
});