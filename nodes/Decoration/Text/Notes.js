// These registration is using function for constructing nodes
// Using class is more recommended for better performance and memory usage
Blackprint.registerNode('Decoration/Text/Notes', function(node){
	if(!Blackprint.Environment.isBrowser)
		return node.setInterface(); // use default interface for Node.js/Deno

	let iface = node.setInterface('BPIC/Decoration/Text/Notes'); // Interface path
	iface.title = 'Notes';

	node.imported = function(data){
		if(data === void 0) return;

		// When this node was successfully imported
		iface.data.value = data.value;
	}

	node.syncIn = function(eventName, value){
		if(eventName === 'value')
			iface.data.value = value;
	}
});