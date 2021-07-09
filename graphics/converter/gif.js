// Node's logic, don't use browser's API or library here
Blackprint.registerNode('Graphics/converter/gif', function(node, iface){
	iface.title = 'Gif player';
	iface.interface = 'BPAO/Graphics/converter/gif';

	node.inputs = {
		URL: String
	}

	node.outputs = {
		Canvas: PIXI.resources.CanvasResource
	}
});

// For Browser Interface, let ScarletsFrame handle this (HotReload available here)
Blackprint.registerInterface('BPAO/Graphics/converter/gif', {
	template: 'Blackprint/nodes/default.sf'
}, function(iface){
	var node = iface.node;
	iface.canvas = null;
	iface.gif = null;
	iface.pixi = null;

	iface.init = function(){
		iface.canvas = document.createElement('canvas');
		iface.pixi = new PIXI.resources.CanvasResource(iface.canvas);

		// This should be on properties
		node.outputs.Canvas = iface.pixi;
	}

	iface.inputs.URL.off('value').on('value', function(port){
		gifler(port.value).get(function(anim){
			iface.gif = anim;
			anim.onDrawFrame = function(ctx, frame){
				ctx.drawImage(frame.buffer, 0, 0);
				iface.pixi.update();
			}

			anim.animateInCanvas(iface.canvas);
		});
	});

	iface.inputs.URL.off('disconnect').on('disconnect', function(port){
		iface.gif.stop();
	});
});