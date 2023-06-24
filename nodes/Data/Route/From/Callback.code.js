Blackprint.registerCode('Data/Route/From/Callback',
class extends Blackprint.Code {
	static routeIn = Blackprint.CodeRoute.None;
	static routeOut = Blackprint.CodeRoute.None;

	// routes == { traceRoute, routeIn, routeOut }
	js(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			input: {
				Value: `await Output.Route()`
			},
			code: ``,
		};
	}
	python(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			input: {
				Value: `Output['Route']()`
			},
			code: ``,
		};
	}
});