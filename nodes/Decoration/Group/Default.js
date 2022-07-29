/**
 * Decoration node that can be used to group nodes and move it together
 * To change this node's settings, you can find it on editor's right-side panel
 * @blackprint node
 */
Blackprint.registerNode('Decoration/Group/Default',
class extends Blackprint.Node {
	constructor(instance){
		super(instance);

		if(!Blackprint.Environment.isBrowser)
			return this.setInterface(); // use default interface for Node.js/Deno

		let iface = this.setInterface('BPIC/Decoration/Group/Default'); // Interface path
		iface.title = 'Default';
	}

	imported(data){
		if(!Blackprint.Environment.isBrowser) return;
		if(data === void 0) return;

		// When this node was successfully imported
		this.iface.data.width = data.width;
		this.iface.data.height = data.height;
		this.iface.data.title = data.title;
		this.iface.data.color = data.color;
	}

	syncIn(eventName, value){
		if(eventName === 'width')
			this.iface.data.width = value;

		if(eventName === 'height')
			this.iface.data.height = value;
	}
});

Blackprint.registerInterface('BPIC/Decoration/Group/Default',
class extends Blackprint.Interface{
	constructor(node){
		super(node);
		this.data ??= {}; // Dummy object store for non-sketch interface
	}
});