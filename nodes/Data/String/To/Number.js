/**
 * Convert string to number
 * This may error if the string couldn't be converted to number
 * For example if it's get NaN
 * @blackprint node
 */
Blackprint.registerNode("Data/String/To/Number",
class Str2Number extends Blackprint.Node {
	static input = { In: String };
	static output = { Out: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "String to Number";
		this._toast = new NodeToast(iface);
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