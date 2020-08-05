(function process(/*ResolverEnvironment*/ env) {
	var id = env.getArguments().number != null ? env.getArguments().number : env.getSource();
	if (!id) return null;

	var GraphQLUtils = new x_116934_graphql.GraphQLExampleUtilities();
	return GraphQLUtils.getRecord('incident', id);
})(env);