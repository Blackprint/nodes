/**
 * Return true if both value is similar
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Compare/Equal",
class extends Blackprint.Node {
	static input = { A: String, B: String };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "String: Equal";
	}

	createIcon(){
		return $('<i class="fa fa-equals"></i>')[0];
	}

	update(){
		let ref = this.ref;
		let { A, B } = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A === B;
	}
});