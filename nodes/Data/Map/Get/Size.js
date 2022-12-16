/**
 * Get Map size
 * @summary Get Map size
 * @blackprint node
 */
Blackprint.registerNode('Data/Map/Get/Size',
class extends Blackprint.Node {
	static input = {
		Map: Map,
	};
	static output = {
		Size: Number,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Get Size";

		this._toast = new NodeToast(this);
	}

	update(){
		let { Input, Output } = this.ref;

		if(Input.Map == null)
			return this._toast.warn("Map must not be null");

		Output.Size = Input.Map.size;
	}
});