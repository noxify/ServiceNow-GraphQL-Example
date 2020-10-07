(function process(/*ResolverEnvironment*/ env) {
	var GraphQLUtils = new global.GraphQLExampleUtilities();
	var filter = (env.getArguments().filter != null) ? env.getArguments().filter : {};
	var paginate = (env.getArguments().paginate != null) ? env.getArguments().paginate : false;
	var sort = (env.getArguments().sort != null) ? env.getArguments().sort : false;
	var query = GraphQLUtils.generateQuery('incident', filter);
	return GraphQLUtils.getRecordList('incident', query, paginate, sort);
})(env);
