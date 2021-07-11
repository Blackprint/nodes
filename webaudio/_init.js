// This script will run first, and then the other files
// depends on blackprint.config.js configuration

// Prepare stuff when the page is loading
// maybe like loading our dependencies for the nodes


// Load dependencies
await sf.loader.js([
	"https://cdn.jsdelivr.net/npm/sfmediastream@latest"
]);

// Shared context between .js and .sf
let Context = Blackprint.Addons('WebAudio');

Context.objLength = function objLength(obj){
	var i = 0;
	for(var k in obj)
		i++;

	return i;
}

// To fix video sync bug
var fakeDestination = Context.fakeDestination = ScarletsMedia.audioContext.createGain();
fakeDestination.gain.value = 0
fakeDestination.connect(ScarletsMedia.audioContext.destination);

// To be extended by node on /webaudio/effect
Context.MediaEffect = class MediaEffect extends Blackprint.Node{
	init(){
		var iface = this;
		var node = this.node;

		iface.inputs.In.on('value', function(port){
			port.value.connect(iface.input);
		})
		.on('disconnect', function(port){
			port.value.disconnect(iface.input);
		});
	}
};

function customEffectFunctionBind(iface){
	var node = iface.node;
	var effect = iface.effect;
	var options = iface.options;

	for(let prop in options){
		if(prop.includes('$'))
			continue;

		let func = effect[prop];
		if(options[prop] !== void 0)
			func(options[prop]);
		else options[prop] = func();

		let value = Number(options[prop].toFixed(2));
		Object.defineProperty(options, prop, {
			enumerable:true,
			get(){
				return value;
			},
			set(val){
				value = val;
				func(val);
			}
		});

		let inputComp = {
			which:prop,
			obj:iface.options,
			whenChanged(now){
				value = now;
				func(now);
			}
		};

		var name = prop[0].toUpperCase()+prop.slice(1);

		var port = node.inputs.add(name, Number);
		port.on('value', function(port){
			options[prop] = port.value; // For options value
			inputComp.default = port.value;
			func(port.value); // For ScarletsMediaEffect value
		});

		port.insertComponent(null, 'comp-port-input', inputComp);
	}
}