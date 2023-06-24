Blackprint.registerCode('Data/String/Add',
class extends Blackprint.Code {
	static routeIn = Blackprint.CodeRoute.MustHave;
	static routeOut = Blackprint.CodeRoute.MustHave;

	// routes == { traceRoute, routeIn, routeOut }
	js(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `Output.Result = Input.A + Input.B;`,
		};
	}
	python(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `Output['Result'] = Input['A'] + Input['B']`,
		};
	}
});