/**
 * The ForLoop node works like a standard code loop,
 * firing off an execution pulse for each index between a start and end.
 * @blackprint node
 */
Blackprint.registerNode("FlowControl/ForLoop",
class extends Blackprint.Node {
	static type = "flow-control";
	static input = {
		/** Reset the index and begin the loop */
		Start: Blackprint.Port.Trigger(port => port.iface.node.trigger()),
		/** Takes in an Int representing the first index of the loop */
		FirstIndex: Blackprint.Port.Default(Number, 0),
		/** Takes in an Int representing the last index of the loop */
		LastIndex: Blackprint.Port.Default(Number, 10),
		/** Put negative value if your want to use decremental loop */
		Increment: Blackprint.Port.Default(Number, 1),
		/** Break the loop and reset the index */
		Break: Blackprint.Port.Trigger(port => port.iface.node._break = true),
	};
	static output = {
		/** This will be called every index increment */
		Do: Blackprint.Types.Route,
		/** Current loop's index */
		Index: Number,
		/**
		 * This will be called after the loop ended,
		 * including break
		 */
		End: Blackprint.Types.Route,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "For Loop";

		this._break = false;
		this._toast = new NodeToast(iface);
	}

	async trigger(){
		let { FirstIndex, LastIndex, Increment } = this.input;
		let output = this.output;

		if(FirstIndex < LastIndex){
			if(Increment <= 0)
				return this._toast.error("Increment value may cause infinity loop");

			for (let i=FirstIndex; i < LastIndex; i += Increment) {
				if(this._break) break;

				output.Index = i;
				await output.Do();
			}
		}
		else if(FirstIndex > LastIndex){
			if(Increment >= 0)
				return this._toast.error("Increment value may cause infinity loop");

			for (let i=FirstIndex; i > LastIndex; i += Increment) {
				if(this._break) break;

				output.Index = i;
				await output.Do();
			}
		}

		this._toast.clear();
		this._break = false;
		output.End();
	}
});