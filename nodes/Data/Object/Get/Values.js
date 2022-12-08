/**
 * Extract object values as an array
 * @summary Object values as array
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
	}

	update(){
		let { Input, Output } = this.ref;
		Output.Values = Object.values(Input.Object);
	}
});