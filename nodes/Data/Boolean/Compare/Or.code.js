Blackprint.registerCode('Data/Boolean/Compare/Or',
class extends Blackprint.Code {
	static routeIn = Blackprint.CodeRoute.MustHave;
	static routeOut = Blackprint.CodeRoute.MustHave;

	// routes == { traceRoute, routeIn, routeOut }
	js(routes){
		return {
			code: `Output.Value = Input["0"] || Input["1"];`,
		};
	}
});