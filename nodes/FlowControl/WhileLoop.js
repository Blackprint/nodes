/**
 * If the condition remains true, it keeps executing the Do loop.
 * If the test condition returns false, the Engine terminates the
 * loop and exits the loop's body.
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/WhileLoop",
class extends Blackprint.Node {
	static type = "flow-control";
	static input = {
		/** Start the while loop */
		Start: Blackprint.Port.Trigger(port => port.iface.node.trigger()),
		/** This is the loop's test condition */
		Condition: Boolean,
	};
	static output = {
		/** This port will triggered every time the condition still true */
		Do: Blackprint.Types.Route,
		/** This port will triggered once the loop was ended */
		End: Blackprint.Types.Route,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "WhileLoop";
	}

	async trigger(){
		if(this._begin) return; // Avoid multiple trigger
		this._begin = true;

		while(this.input.Condition)
			await output.Do();

		this._begin = false;
		output.End();
	}
});