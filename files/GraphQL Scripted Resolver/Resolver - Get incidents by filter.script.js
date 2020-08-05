(function process(/*ResolverEnvironment*/ env) {
	var GraphQLUtils = new x_116934_graphql.GraphQLExampleUtilities();
	var filter = (env.getArguments().filter != null ) ? env.getArguments().filter : {};
	var query = GraphQLUtils.generateQuery('incident', filter);
	return GraphQLUtils.getRecordList('incident', query);
})(env);