/**
 * Trigger a function call on any data changes
 * @blackprint node
 */
Blackprint.registerNode("Data/Any/To/Trigger",
class extends Blackprint.Node {
	static input = { Value: Blackprint.Types.Any };
	static output = { Call: Function };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Trigger on any data changes";
	}

	createIcon(){
		return document.createTextNode('Call()');
	}

	update(){
		this.ref.Output.Call();
	}
});