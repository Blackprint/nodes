/**
 * The FlipFlop node takes in an execution output and
 * toggles between two execution outputs. The first time it is called,
 * output A executes. The second time, B. Then A, then B, and so on.
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/FlipFlop/Route",
class extends Blackprint.Node {
	static type = "flow-control";
	static output = {
		A: Blackprint.Types.Route,
		B: Blackprint.Types.Route,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "FlipFlop";
		this._n = 0;
	}

	update(){
		let n = this._n;
		if(n === 0){
			this._n = 1;
			output.A();
		}
		else{
			this._n = 0;
			output.B();
		}
	}
});