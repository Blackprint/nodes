Blackprint.registerCode('Data/Boolean/To/Route',
class extends Blackprint.Code {
	static routeIn = Blackprint.CodeRoute.MustHave;
	static routeOut = Blackprint.CodeRoute.Optional;

	// routes == { traceRoute, routeIn, routeOut }
	js(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `if(Input.Value === ${JSON.stringify(this.iface.data.signal)}) await Output.Route();`,
		};
	}
	python(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `if(Input['Value'] == ${
				JSON.stringify(this.iface.data.signal) ? 'True' : 'False'
			}): Output['Route']()`,
		};
	}
});