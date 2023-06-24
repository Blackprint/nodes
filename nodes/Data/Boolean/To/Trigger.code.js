Blackprint.registerCode('Data/Boolean/To/Trigger',
class extends Blackprint.Code {
	static routeIn = Blackprint.CodeRoute.MustHave;
	static routeOut = Blackprint.CodeRoute.Optional;

	// routes == { traceRoute, routeIn, routeOut }
	js(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `if(Input.Value === ${JSON.stringify(this.iface.data.signal)}) await Output.Call();`,
		};
	}
	python(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `if(Input["Value"] == ${this.iface.data.signal ? 'True' : 'False'}): Output["Call"]()`,
		};
	}
});