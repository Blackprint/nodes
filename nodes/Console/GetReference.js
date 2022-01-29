Blackprint.registerNode('Console/GetReference',
class GetReferenceNode extends Blackprint.Node {
	static input = {Any: null};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Get Reference";
		iface.description = "Send reference to browser console";
	}

	init(){
		let node = this;
		this.iface.input.Any.on('value', Context.EventSlot, function(){
			console.log('Ref >', node.input.Any);
		});
	}
});