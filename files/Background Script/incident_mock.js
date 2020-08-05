gs.include('_')

var urgency = [ 1, 2, 3 ]
var impact = [ 1, 2, 3 ]
var contactType = [ 'email', 'phone' ]
var category = [ 'software', 'hardware', 'network', 'database' ]
var state = [ 1, 2, 3 ]

var user = [
  '77ad8176731313005754660c4cf6a7de', //david miller
  '62826bf03710200044e0bfc8bcbe5df1', //abel tuter
  '71826bf03710200044e0bfc8bcbe5d3b' //aileen mottern
]

/**
 * Generates 100 incidents
 * First incident has the title ... #1
 */
createIncident(1, 100)

/**
 * Generates 100 incidents
 * first incident has the title ... #101
 */
//createIncident(101, 100)

/**
 * Creates some dummy incidents based on the above defined values
 * 
 * @param {Integer} start The number which should be use as start counter
 * @param {*} max The amount of incidents which should be create
 * 
 * @return {void}
 */
function createIncident(start, max) {

  for (var count = start; count <= max; count++) {
    var gr = new GlideRecord('incident')
    gr.newRecord();

    gr.setValue('caller_id', _.sample(user))
    gr.setValue('category', _.sample(category))
    gr.setValue('contact_type', _.sample(contactType))
    gr.setValue('state', _.sample(state))
    gr.setValue('impact', _.sample(impact))
    gr.setValue('urgency', _.sample(urgency))
    gr.setValue('short_description', 'Mock Incident #' + count)
    gr.setValue('description', 'This is a mock incident to test the QGL performance')

    var insertResult = gr.insert()
  }
}