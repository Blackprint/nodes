/**
 * Compare boolean with AND
 * This will only return `true` if both input is `true`
 * @blackprint node
 */
Blackprint.registerNode("Data/Boolean/Compare/And",
class extends Blackprint.Node {
	static input = { "0": Boolean, "1": Boolean };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Boolean: And";
	}

	createIcon(){
		return document.createTextNode('And');
	}

	update(){
		let ref = this.ref;
		ref.Output.Value = ref.Input["0"] && ref.Input["1"];
	}
});