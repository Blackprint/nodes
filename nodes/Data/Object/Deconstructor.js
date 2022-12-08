/**
 * Deconstruct an output port's structure
 * This also known as object destructuring in JavaScript
 * Or extract property for an object that have structured
 * @summary Deconstruct a port structure
 * @blackprint node
 */
Blackprint.registerNode('Data/Object/Deconstructor',
class extends Blackprint.Node {
	static input = { In: Object };
	static output = {};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Decontructor";
		this._toast = new NodeToast(iface);

		// iface._dynamicPort = true; // Flag this node for having dynamic port
		iface.exportData = this.exportData;
	}

	imported(data){
		if(data?.output == null) return;

		let list = data.output;
		for (let i=0; i < list.length; i++){
			let port = this.createPort('output', list[i], Blackprint.Types.Slot);
			port._uninit_ = true;
		}
	}

	init(){
		this.refreshTypes();
		this._refreshTrigger = () => this.refreshTypes();

		this.ref.IInput.In.on('connecting', this._refreshTrigger);
		this.ref.IInput.In.on('disconnect', ({ target }) => {
			if(target != null) target.off('type.assigned', this._refreshTrigger);
		});
	}

	exportData(){
		return {
			output: Object.keys(this.ref.IOutput),
		};
	}

	refreshTypes(){
		let { IInput, IOutput } = this.ref;
		let targetPort = IInput.In.cables[0]?.output;

		if(targetPort == null) return;

		// Wait for type assignment if we're deconstructing port from other Deconstructor node
		if(targetPort._uninit_){
			targetPort.once('type.assigned', this._refreshTrigger);
			return;
		}

		let { struct, feature } = targetPort;
		if(feature !== Blackprint.Port.StructOf){
			IInput.In.disconnectAll();
			throw new Error("Deconstructor can only be used for output port type with 'Port.StructOf' feature");
		}

		if(this._struct != null){
			if(this._struct !== struct){
				IInput.In.disconnectAll();
				throw new Error("The new connected port structure is different with old structure object");
			}

			// Skip because the output port types already assigned
			else return;
		}

		this._struct = struct;

		for (let key in IOutput) {
			let type = struct[key]?.type;

			// Delete port that was missing from the defined output port's structure
			if(type == null) this.deletePort('output', key);

			// Assign type if exist
			else {
				let port = IOutput[key];
				port.assignType(type);
				port._uninit_ = false;
			}
		}

		// Add missing port
		for (let key in struct) {
			if(IOutput[key] == null) this.createPort('output', key, struct[key].type);
		}
	}
});