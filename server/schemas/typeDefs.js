/*
* In graphql, we can design what data the user can receive when they make a query
* to our endpoints
* typeDefs are how we define the data/schema that our API consumers can request for
* it also defines how everything is connected
* */

const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
			_id: ID!
			firstName: String
			lastName: String
			fullName: String
			sayGreetings: String
			userTodos: [Todo]
	}	
		
	type Todo {
			_id: ID! 
			text: String
			completed: Boolean
			timesCompleted: Int
			userId: String
			user: User
	}
	
	
	type Auth {
			user: User
			token: String
	}
	
	
	type Query {
			users: [User]
			user(id: String!): User
			todos: [Todo]
			todo: Todo
	}

	
	
	type Mutation {
			login(firstName: String!, password: String!): Auth
			createTodo(text: String!, completed: Boolean!): Todo
			createUser(firstName: String!, lastName: String!, password: String!): User
	}
	
`;

module.exports = typeDefs;
