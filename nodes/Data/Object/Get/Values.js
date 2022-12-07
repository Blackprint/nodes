/**
 * Extract object values as an array
 * @blackprint node
 */
Blackprint.registerNode('Data/Object/Get/Values',
class extends Blackprint.Node {
	static input = { Object };
	static output = { Values: Array };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Get Object Values";
		iface.description = 'Object values as array';
	}

	update(){
		let { Input, Output } = this.ref;
		Output.Values = Object.values(Input.Object);
	}
});