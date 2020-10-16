// To be used for Visual and Standalone
// As we don't call any Browser API
class PlaceHolder extends Blackprint.Node{
	static construct(){
		console.log('ehlo');
	}
}

// == Handler ==
// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('placeholder1/placeholder2', function(handler, node){
	node.title = 'title';
	node.description = 'description';
	node.type = 'placeholder-inf';

	handler.outputs = {
		Test: 123
	};
});

// == Blackprint Visual Interpreter ==
// For Browser
Blackprint.registerInterface('placeholder-inf', {
	extend: PlaceHolder,
	template: 'BPAO/placeholder/placeholder.html'
});

// == For Standalone Interpreter ==
// For Non-browser
Blackprint.Interpreter.registerInterface('placeholder-inf', {
	extend: PlaceHolder
});