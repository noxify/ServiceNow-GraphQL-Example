# ServiceNow GraphQL Example

- [ServiceNow GraphQL Example](#servicenow-graphql-example)
  - [What do we need](#what-do-we-need)
  - [(Useful) Links](#useful-links)
  - [What is not included](#what-is-not-included)
  - [What is included](#what-is-included)
  - [Files explained](#files-explained)
    - [GraphQL Schema: Example](#graphql-schema-example)
    - [GraphQL Scripted Resolver: Resolver - Format Date](#graphql-scripted-resolver-resolver---format-date)
    - [GraphQL Scripted Resolver: Resolver - Get Child Incidents](#graphql-scripted-resolver-resolver---get-child-incidents)
    - [GraphQL Scripted Resolver: Resolver - Get incident by number](#graphql-scripted-resolver-resolver---get-incident-by-number)
    - [GraphQL Scripted Resolver: Resolver - Get incidents by filter](#graphql-scripted-resolver-resolver---get-incidents-by-filter)
    - [GraphQL Scripted Resolver: Resolver - Get User by id](#graphql-scripted-resolver-resolver---get-user-by-id)
    - [Script Include: GraphQLExampleUtilities](#script-include-graphqlexampleutilities)
    - [Script Include: moment.js](#script-include-momentjs)
    - [Script Include: _](#script-include-_)
- [How To](#how-to)
  - [Build](#build)
    - [Create the script includes](#create-the-script-includes)
    - [Enable GraphQL](#enable-graphql)
    - [Create a new schema](#create-a-new-schema)
    - [Create the schema resolver](#create-the-schema-resolver)
    - [Create the resolver mappings](#create-the-resolver-mappings)
  - [Test](#test)
    - [Get one incident - Simple](#get-one-incident---simple)
    - [Get one incident - Advanced](#get-one-incident---advanced)
    - [Get all incidents - Simple](#get-all-incidents---simple)
    - [Get all incidents - Advanced](#get-all-incidents---advanced)
  - [GraphQL filters](#graphql-filters)
    - [Examples](#examples)
  - [GraphQL Paging & Sorting](#graphql-paging--sorting)
    - [Example - Paging](#example---paging)
    - [Example - Sorting](#example---sorting)
  - [Extend the schema](#extend-the-schema)
- [Visual Studio Code](#visual-studio-code)
- [Mock Generator](#mock-generator)
- [Conclusion](#conclusion)

## What do we need

* ServiceNow Developer Instance with Release: Paris
* Postman, Insomnia, A REST/GraphQL Client
* Javascript Knowledge

## (Useful) Links

* [SN DEV - GraphQL Introduction](https://docs.servicenow.com/bundle/paris-release-notes/page/release-notes/now-platform-app-engine/web-services-rn.html)
* [Postman](https://www.postman.com/)
* [Insomnia](http://insomnia.rest/)
* [MomentJS](https://www.momentjs.com)
* [UnderscoreJS](https://www.underscorejs.org)
* [GraphQL](https://graphql.org/)

## What is not included

I have excluded the mutation handling for this example.
If you need an example for this, please install the Application "GraphQL Framework Demo Application" ( app id: com.glide.graphql.framework.demo ) via the internal SN App Store.

## What is included
* Example to fetch one record
* Example to fetch multiple records
* Relationships 
  * One-To-One (e.g. Opened By)
  * One-To-Many (e.g. Child Incidents)
* Possibility to filter child incidents
* Simple filter criteria handling
* Reusable code => **DRY**
* Paging
* Sorting


## Files explained

<details>

<summary>Click to expand</summary>

### GraphQL Schema: Example

The complete GraphQL Schema ;) 

### GraphQL Scripted Resolver: Resolver - Format Date

Contains the code to convert a servicenow date/time string.

> Behind the scenes: It calls the `getFormattedDate` method.

### GraphQL Scripted Resolver: Resolver - Get Child Incidents

Contains the code to fetch multiple child incidents w/ or w/o filter criteria.

> Behind the scenes: It calls the `generateQuery` and `getRecordList` with module `incident`.
> There is a hardcoded filter criteria to ensure that `parent_incident` is always set.

### GraphQL Scripted Resolver: Resolver - Get incident by number

Contains the code to fetch a incident based on the given number

> Behind the scenes: It calls the `getRecord` method with module `incident` and the number

### GraphQL Scripted Resolver: Resolver - Get incidents by filter

Contains the code to fetch multiple incidents w/ or w/o filter criteria.

> Behind the scenes: It calls the `generateQuery` and `getRecordList` with module `incident`.

### GraphQL Scripted Resolver: Resolver - Get User by id

Contains the code to fetch a user (e.g. opened by) in a incident.

> Behind the scenes: It calls the `getRecord` method with module `user` and the sysid

### Script Include: GraphQLExampleUtilities

We have one generic Script Include which contains all the logic.
The Script Include handles the following:

- Generating the Objects based on the GraphQL schema
- Fetch one record
- Fetch multiple records
- Convert the given filter conditions into a valid servicenow query
- Format a date value via `moment.js`


### Script Include: moment.js

Moment.js in the version 2.20.1

Source: https://github.com/moment/moment/releases/tag/2.20.1

### Script Include: _ 

UnderscoreJS in the version: 1.8.2
Duplicated from a existing Script Include.

</details>


----

# How To

## Build
### Create the script includes

As you can see in the `files/Script Include/` directory, there are three files which you have to create:

| Script Include Name          | Content                                                      |
|------------------------------|--------------------------------------------------------------|
| `_`                          | Use `files/Script Include/_.script.js`                       |
| `moment.js`                  | Use `files/Script Include/moment.js.script.js`               |
| `GraphQLExampleUtilities`    | Use `files/Script Include/GraphQLExampleUtilities.script.js` |

### Enable GraphQL

In the navigator, go to `System Web Services > GraphQL > Properties`.
In my example, I have activated all checkboxes.

### Create a new schema

In the navigator, go to `System Web Services > GraphQL > GraphQL APIs`.

Click the `New` button and fill the fields with the following values:

> Use can use different values if you want ;) 

| Field                      | Value                                         |
|----------------------------|-----------------------------------------------|
| Name                       | Example                                       |
| Schema namespace           | example                                       |
| Active                     | Yes                                           |
| Schema                     | Use `files/GraphQL Schema/Example.schema.qgl` |
| Requires authentication    | Yes                                           |
| Requires ACL authorization | No                                            |


Click the `Submit` button to create the new GraphQL API.

### Create the schema resolver

In your created schema, you should see now the tab `GraphQL Scripted Resolvers`.

You have to create the following records:

> Please make sure, that you update the scope name.
> `x_116934_graphql` will not work in your instance.

| Resolver Name                      | Content                                       |
|------------------------------------|-----------------------------------------------|
| Resolver - Format Date             | Use `files/GraphQL Scripted Resolver/Resolver - Format Date.script.js` |
| Resolver - Get Child Incidents     | Use `files/GraphQL Scripted Resolver/Resolver - Get Child Incidents.script.js` |
| Resolver - Get incident by number  | Use `files/GraphQL Scripted Resolver/Resolver - Get incident by number.script.js` |
| Resolver - Get incidents by filter | Use `files/GraphQL Scripted Resolver/Resolver - Get incidents by filter.script.js` |
| Resolver - Get User by id          | Use `files/GraphQL Scripted Resolver/Resolver - Get User by id.script.js` |

### Create the resolver mappings

In your created schema, you should see now the tab `GraphQL Resolver Mappings`.

You have to create the following records:

| Path                    | Resolver                           |
|-------------------------|------------------------------------|
| Query:incident          | Resolver - Get incident by number  |
| Query:allIncident       | Resolver - Get incidents by filter |
| Incident:openedAt       | Resolver - Format Date             |
| Incident:resolvedAt     | Resolver - Format Date             |
| Incident:closedAt       | Resolver - Format Date             |
| Incident:childIncidents | Resolver - Get Child Incidents     |
| Incident:parentIncident | Resolver - Get incident by number  | 
| Incident:openedBy       | Resolver - Get User by id          |
| Incident:resolvedBy     | Resolver - Get User by id          |

## Test

All requests have the same config:

* Method: `POST`
* Endpoint: `https://<instancename>.service-now.com/api/now/graphql`
* Auth
  * Type: Basic
  * Username/Password: Only you know it ;)

### Get one incident - Simple

Body:

> Please make sure, that you replace `x116934Graphql` with your Application namespace.
> You can find your Application namespace in the `GraphQL API` record.

```
{
  x116934Graphql {
    example {
      incident(number: "INC0007001") {
        id
        number
        openedBy {
          id
          email
        }
        resolvedBy {
          id
          email
        }
        openedAt
      }
      
    }
  }
}
```

The result should be something like:

```json
{
    "data": {
        "x116934Graphql": {
            "example": {
                "incident": {
                    "id": "f12ca184735123002728660c4cf6a7ef",
                    "number": "INC0007001",
                    "openedBy": {
                        "id": "6816f79cc0a8016401c5a33be04be441",
                        "email": "admin@example.com"
                    },
                    "resolvedBy": null,
                    "openedAt": "2018-10-17T12:47:10Z"
                }
            }
        }
    }
}
```

### Get one incident - Advanced

Body:

> Please make sure, that you replace `x116934Graphql` with your Application namespace.
> You can find your Application namespace in the `GraphQL API` record.

```gql
{
  x116934Graphql {
    example {
      incident(number: "INC0007001") {
        id
        number
        state
        impact
        urgency
        priority
        openedBy {
          id
          email
        }
        resolvedBy {
          id
        }
        formattedOpenedAt : openedAt(format: "DD.MM.Y")
        openedAt
        resolvedAt
        closedAt
        parentIncident {
          id
          number
          openedAt
        }
        newChilds: childIncidents(filter:{state:{eq:NEW}}) {
          results {
            id
            number
            state
            parentIncident {
              number
            }
            openedBy {
              email
            }
          }
        }
        allChilds: childIncidents {
          results {
            id
            number
            state
          }
        }
      }
      
    }
  }
}
```

The result should be something like:

```json
{
  "data": {
    "x116934Graphql": {
      "example": {
        "incident": {
          "id": "f12ca184735123002728660c4cf6a7ef",
          "number": "INC0007001",
          "state": "NEW",
          "impact": "HIGH",
          "urgency": "HIGH",
          "priority": "CRITICAL",
          "openedBy": {
            "id": "6816f79cc0a8016401c5a33be04be441",
            "email": "admin@example.com"
          },
          "resolvedBy": null,
          "formattedOpenedAt": "17.10.2018",
          "openedAt": "2018-10-17T12:47:10Z",
          "resolvedAt": null,
          "closedAt": null,
          "parentIncident": null,
          "newChilds": {
            "results": [{
              "id": "ff4c21c4735123002728660c4cf6a758",
              "number": "INC0007002",
              "state": "NEW",
              "parentIncident": {
                "number": "INC0007001"
              },
              "openedBy": {
                "email": "admin@example.com"
              }
            }]
          },
          "allChilds": {
            "results": [{
                "id": "46c03489a9fe19810148cd5b8cbf501e",
                "number": "INC0000011",
                "state": "CLOSED"
              },
              {
                "id": "e8caedcbc0a80164017df472f39eaed1",
                "number": "INC0000003",
                "state": "IN_PROGRESS"
              },
              {
                "id": "ff4c21c4735123002728660c4cf6a758",
                "number": "INC0007002",
                "state": "NEW"
              }
            ]
          }
        }
      }
    }
  }
}
```

### Get all incidents - Simple

Body:

> Please make sure, that you replace `x116934Graphql` with your Application namespace.
> You can find your Application namespace in the `GraphQL API` record.

```gql
{
  x116934Graphql {
    example {
      allIncident {
        rowCount
        results {
          id
          number
        }
      }
    }
  }
}
```

The result should be something like:

```json
{
  "data": {
    "x116934Graphql": {
      "example": {
        "allIncident": {
          "rowCount": 1064,
          "results": [
            {
              "id": "1c741bd70b2322007518478d83673af3",
              "number": "INC0000060"
            },
            {
              "id": "1c832706732023002728660c4cf6a7b9",
              "number": "INC0009002"
            },
            //...
          ]
        }
      }
    }
  }
}
```

### Get all incidents - Advanced

Body:

> Please make sure, that you replace `x116934Graphql` with your Application namespace.
> You can find your Application namespace in the `GraphQL API` record.

```gql
{
  x116934Graphql {
    example {
      allIncident(filter: {number: {in: ["INC0007001", "INC0007002"]}}) {
        rowCount
        results {
          id
          number
          parentIncident {
            number
          }
        }
      }
    }
  }
}

```

The result should be something like:

```json
{
  "data": {
    "x116934Graphql": {
      "example": {
        "allIncident": {
          "rowCount": 2,
          "results": [
            {
              "id": "f12ca184735123002728660c4cf6a7ef",
              "number": "INC0007001",
              "parentIncident": null
            },
            {
              "id": "ff4c21c4735123002728660c4cf6a758",
              "number": "INC0007002",
              "parentIncident": {
                "number": "INC0007001"
              }
            }
          ]
        }
      }
    }
  }
}
```

## GraphQL filters

I'm a [Gridsome](https://www.gridsome.org) lover and here we have some builtin filters.
I used these filters as startpoint for the implementation.

Currently only the following filter operators are allowed:

| GraphQL Operator | ServiceNow Operator |
|------------------|---------------------|
| eq               | =                   |
| ne               | !=                  |
| in               | IN                  |
| nin              | NOT IN              |
| lt               | <                   |
| lte              | <=                  |
| gt               | >                   |
| gte              | >=                  |
| between          | BETWEEN             |

You can easily extend the query operators
To do this, you have to 
1. extend the `operators` definition in the `initialize` method
   - here you can decide between 
     - the default value transformation (e.g. converting `[A,B]` to `A,B`)
     - or define your own logic which returns the needed the query part 
2. create new inputs in the GraphQL schema
3. update the `IncidentQueryFilter` with the new searchable fields ( like `openedAt` )

### Examples

* Use `allIncident` to find all incidents with state `NEW`(=1) and urgency `LOW` (=3):

```
allIncident(filter:{state:{eq:NEW}, urgency: {eq:LOW}})
```

* Use `allIncident` to find all incidents which have state `NEW` or `IN_PROGRESS` and have urgency `LOW` or `HIGH`

```
allIncident(filter:{state:{in:[NEW, IN_PROGRESS]}, urgency: {in:[LOW, HIGH]}})
```

* Use `allIncident` to find all incidents which have state `NEW` or `IN_PROGRESS` but the urgency is not `LOW` or `HIGH`

```
allIncident(filter:{state:{in:[NEW, IN_PROGRESS]}, urgency: {nin:[LOW, HIGH]}})
```

* Use `allIncident` to get all incidents between `INC0010000` and `INC0010010`

```
allIncident(filter:{number:{between:{from:"INC0010000", to: "INC0010010"}}})
```

## GraphQL Paging & Sorting

Since there is no `@paginate` directive in the ServiceNow GraphQL implementation,
With this example you will get a simple implementation for

* Paging - uses `chooseWindow()`
* Sorting - uses `orderBy()` / `orderByDesc()`
  

### Example - Paging

GraphQL Request:

```
{
  x116934Graphql {
    example {
      allIncident(paginate: {perPage:10, page:2}) {
        rowCount
        pageInfo {
          totalPages
          currentPage
        }
        results {
          number
        }
      }
    }
  }
}

```

Response:

```json
{
  "data": {
    "x116934Graphql": {
      "example": {
        "allIncident": {
          "rowCount": 10,
          "pageInfo": {
            "totalPages": 106,
            "currentPage": 2
          },
          "results": [{
              "number": "INC0010401"
            },
            {
              "number": "INC0010990"
            },
            //...
          ]
        }
      }
    }
  }
}
```

### Example - Sorting

GraphQL Request:

```
{
  x116934Graphql {
    example {
      allIncident(paginate: {perPage:10, page:2}, sort: {by: "number", order:DESC}) {
        rowCount
        pageInfo {
          totalPages
          currentPage
        }
        results {
          number
        }
      }
    }
  }
}
```

Response:

```json
{
  "data": {
    "x116934Graphql": {
      "example": {
        "allIncident": {
          "rowCount": 10,
          "pageInfo": {
            "totalPages": 106,
            "currentPage": 2
          },
          "results": [{
              "number": "INC0010991"
            },
            {
              "number": "INC0010990"
            },
            //...
          ]
        }
      }
    }
  }
}
```

## Extend the schema

In case you need other fields available in your schema, you have to do the following steps.
In this example, we're using the `assigned_to` field.

1. Update the schema

We have to create a new field inside the `Incident` type.
Since all fields are lowerCamelCase, the field will be named as `assignedTo`.

```js
resolvedBy: User @source(value: "assignedTo.value")
```

We're using `User` as field type, otherwise we have no access to the user related fields.

The addition `@source(value: "assignedTo.value")` is used to have access in the scripted resolver via `getSource()`.

2. Update the Script Include

In the `GraphQLExampleUtilities.initialize` you have to update the `mapping` for the `incident` definition.
Just add the following at the end:

```js
assignedTo: { display: false, useQuery: false, field: 'assigned_to' },
```

* The key ( `assignedTo` ) is the same as in your schema - It's important that the name is the same. Otherwise you will have a lot of errors ;) 
* `display` defines if `getDisplayValue` or `getValue` should be used.
* `useQuery` defines if the database value should be replaced with the defined value in `queryBuilder`
* `field` defines the field name in the database

3. Define a new schema mapping

Like in the how to above, we need a new resolver mapping to get the related user information:

| Path                    | Resolver                           |
|-------------------------|------------------------------------|
| Incident:assignedTo     | Resolver - Get User by id          |

4. You're done

If you want to implement other fields like `service` or something else, please make sure

* you have created a `Scripted Resolver` 
* you have defined a new `type` in the schema

# Visual Studio Code

If you're using the ServiceNow VSC Extension, here the content of my `app.config.json` for the GraphQL tables:

```json
{
  "CustomFileTypes": {
    "sys_graphql_typeresolver": {
      "superCoverName": "Miscellaneous",
      "create": "no",
      "coverName": "GraphQL Type Resolver",
      "tags": {
        "script": "js"
      }
    },
    "sys_graphql_resolver": {
      "superCoverName": "Miscellaneous",
      "create": "no",
      "coverName": "GraphQL Scripted Resolver",
      "tags": {
        "script": "js"
      }
    },
    "sys_graphql_schema": {
      "superCoverName": "Miscellaneous",
      "create": "no",
      "coverName": "GraphQL Schema",
      "tags": {
        "schema": "gql"
      }
    }
  }
}
```

# Mock Generator

I created a small background script, which generates the configured amount of incidents with some basic information.

You can find the script here: `files/Background Script/incident_mock.js`

# Conclusion

I personally love GraphQL and the benefits to have only one API instead of creating new API versions all the time.
Also to have the possibility as consumer to define only the required fields helps to reduce the response size.


