Blackprint.registerCode('Data/Boolean/Compare/And',
class extends Blackprint.Code {
	static routeIn = Blackprint.CodeRoute.MustHave;
	static routeOut = Blackprint.CodeRoute.MustHave;
	static isAsync = true;

	// routes == { traceRoute, routeIn, routeOut }
	js(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `Output.Value = Input["0"] && Input["1"];`,
		};
	}

	csharp(routes){ return this.php(routes); }
	php(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `Output["Value"] = Input["0"] && Input["1"];`,
		};
	}

	python(routes){
		return {
			type: Blackprint.CodeType.NotWrapped,
			code: `Output["Value"] = Input["0"] and Input["1"]`,
		};
	}

	golang(routes){
		return {
			code: `Output.Set("Value", Input.Get("0").(bool) && Input.Get("1").(bool))`,
		};
	}

	rust(routes){
		return {
			code: `output.set("Value", input.get::<bool>("0").unwrap() && input.get::<bool>("1").unwrap());`,
		};
	}
});