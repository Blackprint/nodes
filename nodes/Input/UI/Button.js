/**
 * User Interface (UI) for calling a function port
 * @blackprint node
 */
Blackprint.registerNode('Input/UI/Button',
class extends Blackprint.Node {
  static output = {
    /** Call every function port */
    Clicked: Function
  };

  constructor(instance){
    super(instance);

    let iface = this.setInterface('BPIC/Input/UI/Button');
    iface.title = "Button";
  }
});

Blackprint.registerInterface('BPIC/Input/UI/Button',
Context.IFace.Button = class ButtonIFace extends Blackprint.Interface {
  clicked(ev){
    this.node.output.Clicked();
  }
});