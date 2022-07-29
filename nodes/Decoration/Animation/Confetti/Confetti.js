var { Port } = Blackprint;

if(Blackprint.Environment.isBrowser)
	sf.loader.js(["https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"]);

/**
 * Create a confetti that can be triggered by other nodes
 * @blackprint node
 * @summary Decoration animation
 */
Blackprint.registerNode('Decoration/Animation/Confetti/Create',
class extends Blackprint.Node {
	static input = {
		/** Trigger the confetti */
		Trigger: Port.Trigger(port => port.iface.node.trigger()),
		/** Amount of confetti particle */
		ParticleCount: Port.Default(Number, 100),
		/** Particle's velocity */
		StartVelocity: Port.Default(Number, 30),
		/** Particle's spread value */
		Spread: Port.Default(Number, 360),
	};
	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Create Confetti";
	}
	trigger(){
		if(!Blackprint.Environment.isBrowser) return;

		let { ParticleCount, StartVelocity, Spread } = this.input;
		let { x, y } = this.iface;
		let { offset, pos } = this.instance.scope('container');
		let { x: oX, y: oY } = offset;
		let { x: pX, y: pY } = pos;

		confetti({
			particleCount: ParticleCount,
			startVelocity: StartVelocity,
			spread: Spread,
			origin: {
				x: (x + pX + oX + 100) / window.innerWidth,
				y: (y + pY + oY) / window.innerHeight,
			},
		});
	}
});