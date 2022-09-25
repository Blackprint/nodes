/**
 * A decoration that can be used to give additional details on something
 * @blackprint node
 */
Blackprint.registerNode('Decoration/Text/Notes',
class extends Blackprint.Node {
	constructor(instance){
		super(instance);

		if(!Blackprint.Environment.isBrowser){
			this.setInterface(); // use default interface for Node.js/Deno
			return;
		}

		let iface = this.setInterface('BPIC/Decoration/Text/Notes'); // Interface path
		iface.title = 'Notes';
	}

	imported(data){
		if(!Blackprint.Environment.isBrowser) return;
		if(data === void 0) return;

		// When this node was successfully imported
		this.iface.data.value = data.value;
	}

	syncIn(eventName, value){
		if(eventName === 'value')
			this.iface.data.value = value;
	}
});