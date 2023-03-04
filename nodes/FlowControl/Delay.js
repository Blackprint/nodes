/**
 * This delay node will pause the
 * "Route In" for period of time
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/Delay",
class extends Blackprint.Node {
	static type = "flow-control";
	static input = {
		/** in miliseconds (1sec = 1000ms) */
		Duration: Blackprint.Port.Default(Number, 1000),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Delay";
	}

	async update(){
		await new Promise(r => setTimeout(r, this.input.Duration));
	}
});