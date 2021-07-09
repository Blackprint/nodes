// Node's logic, don't use browser's API or library here
Blackprint.registerNode('Graphics/sprite', function(node, iface){
	iface.title = 'Sprite';
	iface.interface = 'BPAO/Graphics/sprite';

	node.inputs = {
		Source: [String, HTMLImageElement, HTMLCanvasElement, HTMLVideoElement, SVGElement, PIXI.resources.CanvasResource, PIXI.Texture],
		x:0,
		y:0,
		ScaleX:1,
		ScaleY:1,
		Rotate:0,
		// SkewX:0,
		// SkewY:0,
		// PivotX:0,
		// PivotY:0,
	};

	node.outputs = {
		Sprite: PIXI.Sprite,
	}
});

// For Browser Interface, let ScarletsFrame handle this (HotReload available here)
Blackprint.registerInterface('BPAO/Graphics/sprite', {
	template: 'Blackprint/nodes/default.sf'
}, function(iface){
	var node = iface.node;

	iface.init = function(){
		var sprite = new PIXI.Sprite();
		node.outputs.Sprite = sprite;

		// For replacing when texture source is disconnected
		sprite._emptyTexture = sprite.texture;
	}

	iface.inputs.Source.off('value').on('value', function(){
		node.outputs.Sprite.texture = PIXI.Texture.from(node.inputs.Source);
		node.update();
	});

	iface.inputs.Source.off('disconnect').on('disconnect', function(){
		var sprite = node.outputs.Sprite;
		sprite.texture = sprite._emptyTexture;
	});

	node.update = function(){
		if(iface.inputs.Source.cables.length === 0)
			return;

		node.outputs.Sprite.setTransform(
			node.inputs.x,
			node.inputs.y,
			node.inputs.ScaleX,
			node.inputs.ScaleY,
			node.inputs.Rotate,
			// node.inputs.SkewX,
			// node.inputs.SkewY,
			// node.inputs.PivotX,
			// node.inputs.PivotY,
		);
	}
});