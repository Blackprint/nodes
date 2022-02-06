Blackprint.registerNode("Data/String/Compare/Equal",
class EmptyNode extends Blackprint.Node {
	static input = { A: String, B: String };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "String: Equal";
		iface.element = $('<i class="fa fa-equals"></i>')[0];
	}

	update(){
		let ref = this.ref;
		let { A, B } = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A === B;
	}
});