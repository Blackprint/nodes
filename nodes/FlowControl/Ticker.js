/**
 * This ticker node will trigger
 * "Route Out" every period of time (interval)
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/Ticker",
class extends Blackprint.Node {
	static type = "flow-control";
	static input = {
		/** in miliseconds (1sec = 1000ms) */
		Duration: Blackprint.Port.Default(Number, 1000),
		Start: Blackprint.Port.Trigger(port => port.iface.node.start()),
		Stop: Blackprint.Port.Trigger(port => port.iface.node.stop()),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Ticker";
	}

	start(){
		clearInterval(this._inv);
		this._inv = setInterval(() => this.routes.routeOut(), this.input.Duration);
	}

	stop(){
		clearInterval(this._inv);
	}
});