/**
 * Return true if both value is not similar
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Compare/NotEqual",
class extends Blackprint.Node {
	static input = { A: String, B: String };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "String: Not Equal";
	}

	createIcon(){
		return $('<i class="fa fa-not-equal"></i>')[0];
	}

	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A !== B;
	}
});