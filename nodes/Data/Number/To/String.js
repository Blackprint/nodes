/**
 * Convert number into string type
 * Radix (Optional):
 * 2: Binary string
 * 16: Hex string
 * @blackprint node
 */
Blackprint.registerNode("Data/Number/To/String",
class NumString extends Blackprint.Node {
	static input = { In: Number, Radix: Number };
	static output = { Out: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Number to String";
		iface.showPortName = true;
	}

	createIcon(){
		return $('<i class="fa fa-magic"></i>')[0];
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		let { In, Radix } = ref.Input;

		if(In == null) return;
		ref.Output.Out = In.toString(Radix);
	}
});