/**
 * Trigger function call if data flow's route
 * was reaching to this node
 * @blackprint node
 */
Blackprint.registerNode("Data/Route/To/Trigger",
class extends Blackprint.Node {
	static output = { Call: Blackprint.Types.Trigger };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Route to trigger";
	}

	createIcon(){
		return document.createTextNode('Call()');
	}

	update(){
		this.ref.Output.Call();
	}
});