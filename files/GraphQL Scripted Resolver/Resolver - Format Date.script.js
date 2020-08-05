(function process(/*ResolverEnvironment*/ env) {
   var dateFormat = env.getArguments().format || '';
   var GraphQLUtils = new x_116934_graphql.GraphQLExampleUtilities();
   return GraphQLUtils.getFormattedDate(env.getSource(), dateFormat);
})(env);