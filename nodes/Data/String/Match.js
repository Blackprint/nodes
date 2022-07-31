/**
 * Find match with RegExp
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Match",
class extends Blackprint.Node {
	static input = {
		Haystack: String,
		Needle: RegExp
	};

	static output = { Matches: Array };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Match";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {Haystack, Needle} = ref.Input;

		if(Haystack == null || Needle == null) return;
		ref.Output.Matches = Haystack.match(Needle);
	}
});