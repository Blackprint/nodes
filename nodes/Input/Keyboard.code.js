Blackprint.registerCode('Input/Keyboard',
class extends Blackprint.Code {
	static routeIn = Blackprint.CodeRoute.Optional;
	static routeOut = Blackprint.CodeRoute.Optional;

	js(routes){
		let { keys } = this.iface.data;

		// Define listened keys as output port
		let addOutput = {};
		keys.forEach(v => addOutput[v] = Boolean);

		return {
			type: Blackprint.CodeType.Callback,
			selfRun: true, // This code will run by itself
			addOutput,
			code: `
				function onKeyboard(ev){
					if(ev.type === 'keydown'){
						Output.Pressed = ev;
						Output.Released = null;
					}
					else if(ev.type === 'keyup'){
						Output.Pressed = null;
						Output.Released = ev;
					}

					if(ev.code in Output)
						Output[ev.code] = ev.type === 'keydown';

					Route.Out();
				}

				Input.Listen = function(){
					let temp = Input.Element || window;
					temp.addEventListener('keydown', onKeyboard);
					temp.addEventListener('keyup', onKeyboard);
				}

				Input.Unlisten = function(){
					let temp = Input.Element || window;
					temp.removeEventListener('keydown', onKeyboard);
					temp.removeEventListener('keyup', onKeyboard);
				}

				Input.Listen();
			`,
		};
	}
});