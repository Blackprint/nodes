Blackprint.registerCode('Data/Route/To/Trigger',
class extends Blackprint.Code {
	static routeIn = Blackprint.CodeRoute.MustHave;
	static routeOut = Blackprint.CodeRoute.Optional;

	// routes == { traceRoute, routeIn, routeOut }
	js(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `return await Output.Call();`,
		};
	}
	python(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `return Output['Call']()`,
		};
	}
});