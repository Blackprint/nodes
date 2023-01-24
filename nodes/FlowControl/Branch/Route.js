/**
 * Trigger route based on boolean's condition
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/Branch/Route",
class extends Blackprint.Node {
	static type = "flow-control";
	static input = {
		Condition: Boolean,
	};
	static output = {
		True: Blackprint.Types.Route,
		False: Blackprint.Types.Route,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Branch";
	}

	update(){
		let Condition = this.input.Condition;
		if(Condition == null) return;

		if(Condition) this.output.True();
		else this.output.False();
	}
});