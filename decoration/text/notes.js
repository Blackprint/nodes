;(function(){ // Private scope

// Node's logic, don't use browser's API or library here
Blackprint.registerNode('decoration/text/notes', function(node, iface){
	iface.title = 'Notes';
	iface.interface = 'BPAO/Decoration/text/notes'; // Interface path

	iface.options = {
		value:'',

		// Triggered when 'value' was changed from view/model
		on$value(now){
			var el = iface.$el('textarea');
		    el.css('height', "5px");
		    el.css('height', (el[0].scrollHeight)+"px");
		}
	};

	node.imported = function(options){
		// When this node was successfully imported
		iface.options.value = options.value;
	}
});

Blackprint.registerInterface('BPAO/Decoration/text/notes', function(iface){
	iface.init = function(){
		setTimeout(function(){
			iface.options.on$value(); // Refresh size
		}, 1000);
	}
});

})(); // End of private scope