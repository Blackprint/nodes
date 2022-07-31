/**
 * Invert `true` to `false` and vice-versa
 * This just like `let NewValue = !Value;`
 * @blackprint node
 */
Blackprint.registerNode("Data/Boolean/Invert",
class extends Blackprint.Node {
	static input = { Value: Boolean };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Invert Boolean";
	}

	createIcon(){
		return document.createTextNode('Invert');
	}

	update(){
		let ref = this.ref;
		ref.Output.Value = !ref.Input.Value;
	}
});