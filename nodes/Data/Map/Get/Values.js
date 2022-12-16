/**
 * Get Map's values
 * @summary Get Map's values
 * @blackprint node
 */
Blackprint.registerNode('Data/Map/Get/Values',
class extends Blackprint.Node {
	static input = {
		Map: Map,
	};
	static output = {
		Values: Array,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Get Values";

		this._toast = new NodeToast(this);
	}

	update(){
		let { Input, Output } = this.ref;

		if(Input.Map == null)
			return this._toast.warn("Map must not be null");

		Output.Values = [...Input.Map.values()];
	}
});