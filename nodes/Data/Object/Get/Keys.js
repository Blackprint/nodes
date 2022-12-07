/**
 * Extract object keys or property name as an array
 * @blackprint node
 */
Blackprint.registerNode('Data/Object/Get/Keys',
class extends Blackprint.Node {
	static input = { Object };
	static output = { Keys: Array };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Get Object Keys";
		iface.description = 'Object keys as array';
	}

	update(){
		let { Input, Output } = this.ref;
		Output.Keys = Object.keys(Input.Object);
	}
});