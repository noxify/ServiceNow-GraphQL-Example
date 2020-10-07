(function process(/*ResolverEnvironment*/ env) {
   var dateFormat = env.getArguments().format || '';
   var GraphQLUtils = new global.GraphQLExampleUtilities();
   return GraphQLUtils.getFormattedDate(env.getSource(), dateFormat);
})(env);
