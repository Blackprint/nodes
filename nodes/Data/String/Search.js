/**
 * Find index from a string with RegExp
 * @summary String
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Search",
class extends Blackprint.Node {
	static input = {
		Haystack: String,
		Needle: Blackprint.Port.Union([String, RegExp])
	};

	static output = { Index: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Search";
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		let {Haystack, Needle} = ref.Input;

		if(Haystack == null || Needle == null) return;
		ref.Output.Index = Haystack.search(Needle);
	}
});