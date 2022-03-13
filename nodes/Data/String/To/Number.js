Blackprint.registerNode("Data/String/To/Number",
class Str2Number extends Blackprint.Node {
	static input = { In: String };
	static output = { Out: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "To Number";
		iface.description = "String";

		this._toast = new NodeToast(iface);
	}

	update(){
		let ref = this.ref;
		let { In } = ref.Input;

		if(In == null) return;

		// This does handle exp, oct, hex and binary: 12e1, 0o12, 0x00, 0b00
		let temp = Number(In);

		if(Number.isNaN(temp)){
			this._toast.error(`"${In}" is not a number`);
			return;
		}

		this._toast.clear();
		ref.Output.Out = temp;
	}
});