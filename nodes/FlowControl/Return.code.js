Blackprint.registerCode('FlowControl/Return',
class extends Blackprint.Code {
	static routeIn = Blackprint.CodeRoute.MustHave;
	static routeOut = Blackprint.CodeRoute.None;

	// routes == { traceRoute, routeIn, routeOut }
	js(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `return Input.Value;`,
		};
	}

	csharp(routes){ return this.php(routes); }
	php(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `return Input["Value"];`,
		};
	}

	python(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `return Input["Value"]`,
		};
	}
});