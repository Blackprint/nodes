/**
 * A Gate node is used as a way to open and close a stream of execution.
 * If the gate is open, then Enter port will trigger Exit function
 * If the gate is closed, then Enter port will will not trigger the Exit
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/Gate",
class extends Blackprint.Node {
	static type = "flow-control";
	static input = {
		/** Trigger the Exit function */
		Enter: Blackprint.Port.Trigger(port => port.iface.node.trigger()),
		/** Default to closed */
		IsOpen: Blackprint.Port.Default(Boolean, false),
		/** If you use this, IsOpen port mustn't be connected to any cable */
		Toggle: Blackprint.Port.Trigger(port => {
			let node = port.iface.node;
			if(node._toggle == null) node._toggle = node.input.IsOpen;

			node._toggle = !node._toggle;
		}),
	};
	static output = {
		/** You can use "Route Out" port in case you need to route node */
		Exit: Function,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Gate";
		this._toggle = null;
	}

	trigger(){
		let { Input, IInput } = this.ref;

		if(IInput.Toggle.cables.length){
			if(this._toggle) this.output.Exit();
			return;
		}

		if(Input.IsOpen) this.output.Exit();
	}
});