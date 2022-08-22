/**
 * User Interface for handling file input
 * @blackprint node
 */
Blackprint.registerNode('Input/UI/File',
class FileNode extends Blackprint.Node {
	// Let's declare the Node port's outputs
	static output = {
		/** Blob URL that can only be used locally in this browser */
		URL: String,
		/** Blob Object */
		Blob: Blob,
	}

	constructor(instance){
		super(instance);

		// Let's use an Interface
		let iface = this.setInterface('BPIC/Input/UI/File');
		iface.title = 'File loader'; // Give it a name
	}
});

Blackprint.registerInterface('BPIC/Input/UI/File',
Context.IFace.File = class FileIFace extends Blackprint.Interface {
	constructor(node){
		super(node);

		this.file = null;
		this.name = '';

		// Create input element for browse/dropping file
		let inputEl = this.inputEl = document.createElement('input');
		inputEl.type = 'file';

		// Listen to the input element if it has been changed
		let that = this;
		inputEl.addEventListener('input', function(){
			that.setFile(that.inputEl.files[0]);
		});
	}

	setFile(file){
		this.name = file.name;

		let node = this.node;
		node.output.Blob = file;

		URL.revokeObjectURL(node.output.URL);
		node.output.URL = URL.createObjectURL(file);
		node.routes.routeOut();
	}

	browseFile(ev){
		this.inputEl.click();
	}
});