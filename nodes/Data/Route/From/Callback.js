/**
 * Route to other node if the input receive `true` value
 * @blackprint node
 */
Blackprint.registerNode("Data/Route/From/Callback",
class extends Blackprint.Node {
	static input = { Value: Blackprint.Port.Trigger(port => port.iface.ref.Output.Route()) };
	static output = { Route: Blackprint.Types.Route };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Route on Call";
	}

	createIcon(){
		return document.createTextNode('Route ➤');
	}
});