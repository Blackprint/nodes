/**
 * Find a string (needle) from a string (haystack)
 * with a string (replacement)
 * @summary String
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Replace",
class extends Blackprint.Node {
	static input = {
		Haystack: String,
		Needle: Blackprint.Port.Union([RegExp, String]),
		Replacement: String,
	};

	static output = { Result: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Replace";
	}

	update(){
		let ref = this.ref;
		let {Haystack, Needle, Replacement} = ref.Input;

		if(Haystack == null || Needle == null || Replacement == null) return;
		ref.Output.Result = Haystack.replace(Needle, Replacement);
	}
});