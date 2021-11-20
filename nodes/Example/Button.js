Blackprint.registerNode('Example/Button/Simple',
class extends Blackprint.Node {
  constructor(instance){
    super(instance);

    let iface = this.setInterface('BPIC/Example/Button'); // Can only being called once

    // iface only exist after setInterface
    iface.title = "Button";

    this.output = {
      Clicked: Function
    };
  }

  // Proxy event object from: node.clicked -> node.clicked -> output.Clicked
  clicked(ev){
    console.log('Button/Simple: got', ev, "time to trigger to the other node");
    this.output.Clicked(ev);
  }
});


Blackprint.registerInterface('BPIC/Example/Button',
class extends Blackprint.Interface {
  clicked(ev){
    console.log("Engine: 'Trigger' button clicked, going to run the handler");
    this.node.clicked && this.node.clicked(ev);
  }
});