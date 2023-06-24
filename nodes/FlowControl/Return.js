/**
 * This is used for code generation to return value for the function call.
 * This node will do nothing if being used for Blackprint Engine/Sketch.
 * @summary For code generation only
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/Return",
class extends Blackprint.Node {
	static type = "flow-control";
	static input = { Value: Blackprint.Types.Any };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Return";
	}

	init(){
		// Disable route out
		this.routes.disableOut = true;
	}

	// No operation
	update(){}
});