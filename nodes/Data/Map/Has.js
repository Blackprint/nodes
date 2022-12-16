/**
 * Check if Map has an key
 * @summary Check if Map has an key
 * @blackprint node
 */
Blackprint.registerNode('Data/Map/Has',
class extends Blackprint.Node {
	static input = {
		Map: Map,
		Key: Blackprint.Types.Any,
	};
	static output = {
		Exist: Boolean,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Map has key";
	}

	init(){
		let { Input, Output } = this.ref;

		if(Input.Map == null || Input.Key == null)
			return this._toast.warn("Map or Key must not be null");

		Output.Exist = Input.Map.has(Input.Key);
	}
});