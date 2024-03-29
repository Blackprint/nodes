/**
 * Trigger a function call if the input receive `true` value
 * @blackprint node
 */
Blackprint.registerNode("Data/Boolean/To/Trigger",
class extends Blackprint.Node {
	static input = { Value: Boolean };
	static output = { Call: Blackprint.Types.Trigger };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Trigger on true";
		iface.data = {signal: true};
	}

	createIcon(){
		return document.createTextNode('Call()');
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		if(this.ref.Input.Value === this.iface.data.signal)
			this.ref.Output.Call();
	}
});