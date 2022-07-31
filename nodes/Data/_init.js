// This script will run first, and then the other files
// depends on blackprint.config.js configuration

// Because .js and .sf is separated
// we also need to call loadScope just like _init.js
let Blackprint = window.Blackprint.loadScope({
	// You can find the URL on Blackprint menu -> Modules
	// This will also be exported to JSON if this module's nodes is being used
	url: import.meta.url,

	// This will autoload (*.sf.mjs) and (*.sf.css) file for Browser
	hasInterface: true,

	// This will autoload (*.docs.json) for Browser
	hasDocs: true,
});

// Global shared context
let Context = Blackprint.createContext('Data');

// This is needed to avoid duplicated event listener when using hot reload
// Event listener that registered with same slot will be replaced
Context.EventSlot = {slot: 'my-private-event-slot'};

let $ = globalThis.sf?.$;
if(!Blackprint.Environment.isBrowser)
	$ = ()=> [];


// Register with default interface
Blackprint.registerInterface("BPIC/Data/Minimal",
Context.IFace.DataMinimal = class extends Blackprint.Interface { });

// Bootstrap for add toast on node decoration
let NodeToast = Context.NodeToast = class NodeToast {
	constructor(iface){
		this.iface = iface;
		this._have = false;
	}

	clear(){
		// Early return to improve performance
		if(this._have === false) return;

		if(this.haveInfo)
			this.haveInfo.destroy();
		if(this.haveWarn)
			this.haveWarn.destroy();
		if(this.haveError)
			this.haveError.destroy();

		this.haveInfo = false;
		this.haveWarn = false;
		this.haveError = false;
	}

	_reduceText(text){
		this._have = true;
		return text.replace(/\w{15,}/g, full => full.slice(0, 5)+'...');
	}

	info(text){
		if(!this.iface.$decoration) return;
		let temp = text;
		text = this._reduceText(text);

		if(this.haveInfo)
			this.haveInfo.text = text;
		else
			this.haveInfo = this.iface.$decoration.info(text);

		this.haveInfo._raw = temp;
	}

	warn(text){
		if(!this.iface.$decoration) return;
		let temp = text;
		text = this._reduceText(text);

		if(this.haveWarn)
			this.haveWarn.text = text;
		else
			this.haveWarn = this.iface.$decoration.warn(text);

		this.haveWarn._raw = temp;
	}

	error(text){
		if(!this.iface.$decoration) return;
		let temp = text;
		text = this._reduceText(text);

		if(this.haveError)
			this.haveError.text = text;
		else
			this.haveError = this.iface.$decoration.error(text);

		this.haveError._raw = temp;
	}

	success(text){
		if(!this.iface.$decoration) return;
		let ref = this.iface.$decoration.success(this._reduceText(text));
		ref._raw = text;
	}
}