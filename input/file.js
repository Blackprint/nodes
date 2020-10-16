;(function(){ // Private scope

// Node's logic, don't use browser's API or library here
Blackprint.registerNode('Input/file', function(node, iface){
	iface.title = 'File loader';
	iface.interface = 'BPAO/Input/file';

	node.outputs = {
		URL: String
	}
});

// For Browser Interface, let ScarletsFrame handle this (HotReload available here)
Blackprint.registerInterface('BPAO/Input/file', function(iface){
	var node = iface.node;
	iface.file = null;
	iface.name = '';

	iface.browseFile = function(ev){
		iface.$el('input').click();
	}

	iface.dropFile = function(list){
		iface.file = list;
	}

	iface.on$file = function(now){
		URL.revokeObjectURL(node.outputs.URL);
		node.outputs.URL = URL.createObjectURL(now[0]);
		this.name = now[0].name;
	}
});

})(); // End of private scope