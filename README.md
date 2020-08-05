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
  - [Create the script includes](#create-the-script-includes)
  - [Enable GraphQL](#enable-graphql)
  - [Create a new schema](#create-a-new-schema)
  - [Create the schema resolver](#create-the-schema-resolver)
  - [Create the resolver mappings](#create-the-resolver-mappings)
- [Testing](#testing)

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

## What is not included

I have excluded the mutation handling from this example.

If you need an example for this, please install the Application "GraphQL Framework Demo Application" ( app id: com.glide.graphql.framework.demo ) via the internal SN App Store.

## What is included
* Example to fetch one record
* Example to fetch multiple records
* Relationships 
  * One-To-One (e.g. Opened By)
  * One-To-Many (e.g. Child Incidents)
* Possibility to filter child incidents
* Simple filter criteria handling ( Supported Operators `eq`, `ne`, `in` )
* Reusable code => **DRY**


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

## Create the script includes

As you can see in the `files/Script Include/` directory, there are three files which you have to create:

| Script Include               | Content                                                      |
|------------------------------|--------------------------------------------------------------|
| `_`                          | Use `files/Script Include/_.script.js`                       |
| `moment.js`                  | Use `files/Script Include/moment.js.script.js`               |
| `GraphQLExampleUtilities.js` | Use `files/Script Include/GraphQLExampleUtilities.script.js` |

## Enable GraphQL

In the navigator, go to `System Web Services > GraphQL > Properties`.
In my example, I have activated all checkboxes.

## Create a new schema

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

## Create the schema resolver

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

## Create the resolver mappings

In your created schema, you should see now the tab `GraphQL Resolver Mappings`.

You have to create the following records:

| Path                    | Resolver                           |
|-------------------------|------------------------------------|
| Query:incident          | Resolver - Get incident by number  |
| Incident:openedAt       | Resolver - Format Date             |
| Incident:childIncidents | Resolver - Get Child Incidents     |
| Query:allIncident       | Resolver - Get incidents by filter |
| Incident:parentIncident | Resolver - Get incident by number  | 
| Incident:openedBy       | Resolver - Get User by id          |

# Testing