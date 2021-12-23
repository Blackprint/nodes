Blackprint.registerNode('Console/GetReference',
class GetReferenceNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Get Reference";
		iface.description = "Send reference to browser console";

		this.input = {Any: null};
	}

	init(){
		let node = this;
		this.iface.input.Any.on('value', Context.EventSlot, function(){
			console.log('Ref >', node.input.Any);
		});
	}
});