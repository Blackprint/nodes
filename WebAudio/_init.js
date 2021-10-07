// This script will run first, and then the other files
// depends on blackprint.config.js configuration

// Prepare stuff when the page is loading
// maybe like loading our dependencies for the nodes


// Load dependencies
await imports([
	"https://cdn.jsdelivr.net/npm/sfmediastream@latest"
]);


// Because .js and .sf is separated
// we also need to call loadScope just like _init.js
let Blackprint = window.Blackprint.loadScope({
	// You can find the URL on Blackprint menu -> Modules
	// This will also be exported to JSON if this module's nodes is being used
	url: import.meta.url,
});

// Global shared context
let Context = Blackprint.getContext('WebAudio');

Context.objLength = function objLength(obj){
	var i = 0;
	for(var k in obj) i++;
	return i;
}

// To fix video sync bug
var fakeDestination = Context.fakeDestination = ScarletsMedia.audioContext.createGain();
fakeDestination.gain.value = 0
fakeDestination.connect(ScarletsMedia.audioContext.destination);

// To be extended by Interface on /webaudio/effect
// Don't immediately put in 'Context.MediaEffect = class MediaEffect {}'
// Or the compiler will not soft hot reload the class prototype
// We may need to migrate this to other file, because this file contains 'import.meta'
// and it may broke when this file will be hot reloaded
class MediaEffect extends Blackprint.Interface {
	init(){
		var iface = this;
		var node = this.node;

		iface.input.In.on('value', function(port){
			port.value.connect(iface.audioInput);
		})
		.on('disconnect', function(port){
			port.value.disconnect(iface.audioInput);
		});
	}
};

Context.MediaEffect = MediaEffect;

function customEffectFunctionBind(iface){
	var node = iface.node;
	var effect = iface.effect;
	var data = iface.data;

	for(let prop in data){
		if(prop.includes('$'))
			continue;

		let func = effect[prop];
		if(data[prop] !== void 0)
			func(data[prop]);
		else data[prop] = func();

		let value = Number(data[prop].toFixed(2));
		Object.defineProperty(data, prop, {
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
			which: prop,
			obj: iface.data,
			whenChanged(now){
				value = now;
				func(now);
			}
		};

		var name = prop[0].toUpperCase()+prop.slice(1);

		var port = node.input.add(name, Number);
		port.on('value', function(port){
			data[prop] = port.value; // For data value
			inputComp.default = port.value;
			func(port.value); // For ScarletsMediaEffect value
		});

		port.insertComponent(null, 'comp-port-input', inputComp);
	}
}