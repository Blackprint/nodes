Blackprint.registerCode('Console/Log',
class extends Blackprint.Code {
	// routes == { traceRoute, routeIn, routeOut }
	js(routes){
		return {
			code: `console.log(Input.Any);`,
		};
	}
	python(routes){
		return {
			code: `print(Input['Any'])`,
		};
	}
});