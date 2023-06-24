/**
 * User Interface (UI) for calling a function port
 * @blackprint node
 */
Blackprint.registerNode('Input/UI/Button',
class extends Blackprint.Node {
  static output = {
    /** Call every function port */
    Clicked: Blackprint.Types.Trigger
  };

  constructor(instance){
    super(instance);

    let iface = this.setInterface('BPIC/Input/UI/Button');
    iface.title = "Button";
  }

  syncIn(key, val){
    if(key === 'clicked') this.output.Clicked();
  }
});

Blackprint.registerInterface('BPIC/Input/UI/Button',
Context.IFace.Button = class ButtonIFace extends Blackprint.Interface {
  clicked(ev){
    this.node.output.Clicked();
    this.node.syncOut('clicked');
  }
});