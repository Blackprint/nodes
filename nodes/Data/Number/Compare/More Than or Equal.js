/**
 * Return true if A is more than or equal with B (A >= B)
 * @blackprint node
 */
Blackprint.registerNode("Data/Number/Compare/MoreThanOrEqual",
class extends Blackprint.Node {
	static input = { A: Number, B: Number };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Number: More Than or Equal";
	}

	createIcon(){
		return $('<i class="fa fa-more-than-equal"></i>')[0];
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A >= B;
	}
});