(function process(/*ResolverEnvironment*/ env) {

   gs.include('moment.js');

   var dateFormat = env.getArguments().format || '';
   var currentDate = moment(env.getSource());

   return currentDate.utc().format(dateFormat);
})(env);