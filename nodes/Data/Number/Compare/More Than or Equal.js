/**
 * Return true if A is more than or equal with B (A >= B)
 * @blackprint node
 */
Blackprint.registerNode("Data/Number/Compare/More Than or Equal",
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

	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A >= B;
	}
});