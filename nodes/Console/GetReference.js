/**
 * Any data that being passed to this node
 * will be sent to Console on your DevTools
 * To open the DevTools you can use CTRL + Shift + I, then go to Console
 * @blackprint node
 * @summary Send reference to browser console
 */
Blackprint.registerNode('Console/GetReference',
class GetReferenceNode extends Blackprint.Node {
	static input = {Any: Blackprint.Types.Any};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Get Reference";
	}

	init(){
		let node = this;
		this.iface.input.Any.on('value', Context.EventSlot, function(){
			console.log('Ref >', node.input.Any);
		});
	}
});