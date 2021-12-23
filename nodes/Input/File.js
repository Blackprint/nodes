Blackprint.registerNode('Input/File',
class FileNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		// Let's use an Interface
		let iface = this.setInterface('BPIC/Input/File');
		iface.title = 'File loader'; // Give it a name

		// Let's declare the Node port's outputs
		this.output = {
			URL: String
		}
	}
});

Blackprint.registerInterface('BPIC/Input/File',
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
		this.file = file;

		URL.revokeObjectURL(this.node.output.URL);
		this.node.output.URL = URL.createObjectURL(file);
		this.name = file.name;
	}

	browseFile(ev){
		this.inputEl.click();
	}
});