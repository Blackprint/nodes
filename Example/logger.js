Blackprint.registerNode('Example/Display/Logger', function(node){
	let iface = node.setInterface('BPIC/Example/logger'); // Let's use ./logger.js
	iface.title = "Logger";
	iface.description = 'Print anything into text';

	const Input = node.input = {
		Any: Blackprint.Port.ArrayOf(null) // Any data type, and can be used for many cable
	};

	function refreshLogger(val){
		if(val === null)
			iface.log = 'null';
		else if(val === undefined)
			iface.log = 'undefined';
		else if(val.constructor === Function)
			iface.log = val.toString();
		else if(val.constructor === String || val.constructor === Number)
			iface.log = val;
		else
			iface.log = JSON.stringify(val);
	}

	node.init = function(){
		// Let's show data after new cable was connected or disconnected
		iface.on('cable.connect cable.disconnect', function(){
			console.log("A cable was changed on Logger, now refresing the input element");
			refreshLogger(Input.Any);
		});

		iface.input.Any.on('value', function(port){
			console.log("I connected to", port.name, "port from", port.iface.title, "that have new value:", port.value);

			// Let's take all data from all connected nodes
			// Instead showing new single data-> val
			refreshLogger(Input.Any);
		});
	}
});

Blackprint.registerInterface('BPIC/Example/logger', function(iface, bind){
	var log = '...';
	bind({
		get log(){
			return log;
		},
		set log(val){
			log = val;
			console.log("Logger:", val);
		}
	});
});