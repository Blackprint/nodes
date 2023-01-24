/**
 * The DoN node will fire off an execution pulse N times.
 * After the limit has been reached, it will cease all outgoing
 * execution until a pulse is sent into its Reset input.
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/DoN",
class extends Blackprint.Node {
	static type = "flow-control";
	static input = {
		/** This input sets the number of times the DoN node will trigger */
		N: Blackprint.Port.Default(Number, 1),
		/** This execution input will reset the DoN node so that it can be triggered again. */
		Reset: Blackprint.Port.Trigger(port => port.iface.node._n = 0),
	};
	static output = {
		/**
		 * This port will only triggered if the DoN
		 * has not yet been triggered more than N times,
		 * or if its Reset input has been called.
		 */
		Do: Blackprint.Types.Route,
		/**
		 * This port will triggered once if DoN
		 * Already triggered for N times.
		 */
		End: Blackprint.Types.Route,
		Counter: Number,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Do N";
		this._n = 0;
	}

	update(){
		if(this._n >= this.input.N) return;
		this._n++;

		let output = this.output;
		output.Counter = this._n;
		output.Do();

		if(this._n === this.input.N) output.End();
	}
});