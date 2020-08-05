(function process(/*ResolverEnvironment*/ env) {
    var GraphQLUtils = new x_116934_graphql.GraphQLExampleUtilities();
    
    //set parent incident sys id as hardcoded query
    var filter = { parentIncident: { eq: env.getSource()} };
    var query = GraphQLUtils.generateQuery('incident', filter);

    //if we have additional filter criterias
    var childFilter = (env.getArguments().filter != null) ? env.getArguments().filter : {};
    var childQuery = GraphQLUtils.generateQuery('incident', childFilter);

    //merge both queries
    var listQuery = ( !childQuery ) ? query : query+'^'+childQuery;
    
    return GraphQLUtils.getRecordList('incident', listQuery);
})(env);