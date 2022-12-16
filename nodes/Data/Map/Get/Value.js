/**
 * Get value from Map
 * @summary Get value from Map
 * @blackprint node
 */
Blackprint.registerNode('Data/Map/Get/Value',
class extends Blackprint.Node {
	static input = {
		Map: Map,
		Key: Blackprint.Types.Any,
	};
	static output = {
		Value: Blackprint.Types.Any,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Get Value";

		this._toast = new NodeToast(this);
	}

	update(){
		let { Input, Output } = this.ref;

		if(Input.Map == null)
			return this._toast.warn("Map must not be null");

		Output.Value = Input.Map.get(Input.Key);
	}
});