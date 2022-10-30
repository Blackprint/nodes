/**
 * Add breakpoint that will pause the execution if any debugger was attached
 * @blackprint node
 * @summary Add breakpoint for debugging
 */
Blackprint.registerNode('Console/Breakpoint',
class extends Blackprint.Node {
	static input = {Any: Blackprint.Types.Any};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Breakpoint";
	}

	init(){
		// InputPort = port from this node (Breakpoint.Any)
		// OutputPort = port from other node (that connected to this node)
		this.ref.IInput.Any.on('value', ({ cable }) => {
			let { value, output: OutputPort, input: InputPort } = cable;
			debugger;
		});
	}

	update(){}
	routeIn(){
		debugger;
	}
});