(function process(/*ResolverEnvironment*/ env) {
  var id = env.getArguments().id != null ? env.getArguments().id : env.getSource();
  if(!id) return null;

  var GraphQLUtils = new x_116934_graphql.GraphQLExampleUtilities();
  return GraphQLUtils.getRecord('user', id);
})(env);