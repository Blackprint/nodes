/**
 * Create a new Map
 * @summary Create a new Map
 * @blackprint node
 */
Blackprint.registerNode('Data/Map/Create',
class extends Blackprint.Node {
	static output = {
		Map: Map,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Create Map";
	}

	init(){
		let { Output } = this.ref;
		Output.Map = new Map();
	}
});