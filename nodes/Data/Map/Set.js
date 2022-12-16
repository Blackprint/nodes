/**
 * Set data on Map
 * @summary Set data on Map
 * @blackprint node
 */
Blackprint.registerNode('Data/Map/Set',
class extends Blackprint.Node {
	static input = {
		Map: Map,
		Key: Blackprint.Types.Any,
		Value: Blackprint.Types.Any,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Set Data";
	}

	init(){
		let { Input } = this.ref;

		if(Input.Map == null || Input.Key == null || Input.Value == null)
			return this._toast.warn("Map, Key, or Value must not be null");

		Input.Map.set(Input.Key, Input.Value);
	}
});