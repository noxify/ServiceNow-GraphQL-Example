gs.include('_');
gs.include('moment.js');

var GraphQLExampleUtilities = Class.create();

GraphQLExampleUtilities.prototype = {

  type: 'GraphQLExampleUtilities',

  initialize: function () {

    //Table definition for each module
    this.table = {
      incident: {
        tableName: 'incident',
        queryField: 'number'
      },
      user: {
        tableName: 'sys_user',
        queryField: 'sys_id'
      }
    };

    //Mapping which will be used as graphl
    //response
    this.mapping = {
      incident: {
        id: { display: false, field: 'sys_id' },
        number: { display: false, field: 'number' },
        openedBy: { display: false, field: 'opened_by' },
        resolvedBy: { display: false, field: 'resolved_by' },
        openedAt: { display: false, field: 'opened_at' },
        resolvedAt: { display: false, field: 'resolved_at' },
        closedAt: { display: false, field: 'closed_at' },
        parentIncident: { display: true, field: 'parent_incident' },
        childIncidents: { display: false, field: 'sys_id' }
      },

      user: {
        id: { display: false, field: 'sys_id' },
        email: { display: false, field: 'email' }
      }
    };

    //Definition for the value replacement
    //e.g. the GQL enums 
    this.queryBuilder = {
      incident: {
        state: {
          NEW: 1,
          IN_PROGRESS: 2,
          ON_HOLD: 3,
          RESOLVED: 6,
          CLOSED: 7,
          CANCELED: 8,
        },
        contactType: {
          EMAIL: 'email',
          PHONE: 'phone',
          SELF_SERVICE: 'self-service',
          WALK_IN: 'walk-in'
        },
        impact: {
          LOW: 3,
          MEDIUM: 2,
          HIGH: 1
        },
        urgency: {
          LOW: 3,
          MEDIUM: 2,
          HIGH: 1
        },
        priority: {
          PLANNING: 5,
          LOW: 4,
          MODERATE: 3,
          HIGH: 2,
          CRITICAL: 1
        }
      }
    };

    //Definition for the filter operators
    this.operators = {
      eq: '=',
      ne: '!=',
      in: 'IN'
    };
  },

  /**
   * Generates the encoded query based on the given
   * module and filter criterias
   * 
   * @param {String} module The module name e.g. incident or user
   * @param {Object} filter The filter criterias
   * 
   * @return {String|null} The encoded query string or null
   */
  generateQuery: function (module, filter) {

    if (_.isNull(filter) || _.isUndefined(filter) || _.isEmpty(filter)) {
      return null;
    }

    var that = this;
    var query = _.map(filter, function (definition, field) {

      var targetField = (that.mapping[ module ][ field ]) ? that.mapping[ module ][ field ].field : field;

      return _.map(definition, function (value, op) {
        value = (_.isArray(value)) ? value.join(',') : value;
        value = (that.queryBuilder[ module ][ field ]) ? that.queryBuilder[ module ][ field ][ value ] : value;
        return targetField + that.operators[ op ] + value;
      });
    });

    query = _.flatten(query);

    return query.join('^');
  },

  /**
   * Gets a list of records based on the given credentials
   * and converts it to the expected graphql object
   * 
   * @param {String} module The current module e.g. incident or user
   * @param {String} query  The query which should be execute
   * 
   * @return {Array} The result with the generated objects
   */
  getRecordList: function (module, query) {
    var moduleConfig = this.table[ module ];
    var grRecord = new GlideRecord(moduleConfig.tableName);
    if (query) {
      grRecord.addEncodedQuery(query);
    }
    grRecord.query();
    var records = [];
    while (grRecord.next()) {
      records.push(this.createResponseObject(grRecord, this.mapping[ module ]));
    }

    return {
      rowCount: records.length,
      results: records
    };
  },

  /**
   * Get a record based on the given credentials
   * and converts it to the expected graphql object
   * 
   * @param {String} module The current module e.g. incident or user
   * @param {String} value  The value which should be used for the `get`
   * 
   * @return {Object} The generated object from `createResponseObject`
   */
  getRecord: function (module, value) {
    var moduleConfig = this.table[ module ];
    var grRecord = new GlideRecord(moduleConfig.tableName);
    var exists = grRecord.get(moduleConfig.queryField, value);
    return (exists) ? this.createResponseObject(grRecord, this.mapping[ module ]) : null;
  },

  /**
   * Converts the given date string based on the given format
   * Also the given date will be returned as UTC date
   * 
   * Valid formats can be found here:
   * https://momentjs.com/docs/#/displaying/format/
   * 
   * @param {String} value The date/time string
   * @param {String} format The format which should be used
   * 
   * @return {String} the formatted date
   */
  getFormattedDate: function (value, format) {
    var currentDate = moment(value);
    return currentDate.utc().format(format);
  },

  /**
   * Generates the graphql response object based
   * on the mapping definition
   * 
   * @param {GlideRecord} grRecord The current Glide Record
   * @param {Object} objMapping The field mapping
   * 
   * @return {Object}
   */
  createResponseObject: function (grRecord, objMapping) {
    return _.mapObject(objMapping, function (fieldDef) {
      return (fieldDef.display === true) ? grRecord.getDisplayValue(fieldDef.field) : grRecord.getValue(fieldDef.field);
    });
  }
};