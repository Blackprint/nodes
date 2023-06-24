// Register Node
// Blackprint will handle data flow between nodes connection
// This should be simple and contain structure only
// Just like creating a template/base and attach an interface for extra control
Blackprint.registerNode('Example/Button/Simple',
class extends Blackprint.Node {
  static output = {
    Clicked: Blackprint.Types.Trigger
  };

  constructor(instance){
    super(instance);

    // Must be called once
    let iface = this.setInterface('BPIC/Example/Button');

    // iface only exist after setInterface
    iface.title = "Button";
  }

  // <Just for example>
  // This can be called from Interface
  clicked(ev){
    Context.log('Example/Button/Simple', 'I got ', ev, "time to trigger to the other node");
    this.output.Clicked(ev);
    this.syncOut('click', true);
  }

	// Remote sync in
	syncIn(id, data){
		if(id === 'click') this.clicked();
	}
});


// Register Interface
// Interface will be exposed to public and being attached for a node
// it's just like API or User Interface (on sketch editor)
// Let's think you're creating a library, these properties can be accessed by other developers
Blackprint.registerInterface('BPIC/Example/Button',
Context.IFace.Button = class ButtonIFace extends Blackprint.Interface {
  clicked(ev){
    Context.log('BPIC/Example/Button (non-HTML)', "'Trigger' button clicked, going to run the handler");
    this.node.clicked?.(ev);
  }
});