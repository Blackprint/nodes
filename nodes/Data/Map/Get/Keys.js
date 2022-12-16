/**
 * Get Map's keys
 * @summary Get Map's keys
 * @blackprint node
 */
Blackprint.registerNode('Data/Map/Get/Keys',
class extends Blackprint.Node {
	static input = {
		Map: Map,
	};
	static output = {
		Keys: Array,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Get Keys";
	}

	init(){
		let { Input, Output } = this.ref;

		if(Input.Map == null)
			return this._toast.warn("Map must not be null");

		Output.Keys = [...Input.Map.keys()];
	}
});