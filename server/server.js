const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// graphql will create an endpoint to  POST /graphql where it will then utilize our resolvers
const {
	typeDefs,
	resolvers
} = require('./schemas');

const {
	secret
} = require('./common/vars');

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/graphqlTodos')
	.then(() => {
		console.log('successfully connected db');
	});

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	// This function will be called in every single query or mutation that goes through our
	// graphql API
	// Whatever we return from context will become available in the "context" parameter
	// in all of our queries and mutations
	context: ({ req }) => {
		let token = req.headers.authorization;
		// "Bearer asjhdgasoydgasoydgasdoyagdaoudgasdoyadassa"
		if (token) {
			// [ "Bearer", "asjhdgasoydgasoydgasdoyagdaoudgasdoyadassa" ]
			token = token.split(' ')[1].trim();
		}

		if (!token) {
			return req;
		}
		try {
			const user = jwt.verify(token, secret);
			req.user = user;
		} catch (e) {
			console.log('invalid token', e);
		}
		return req;
	}
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const startServer = async () => {
	await apolloServer.start();

	apolloServer.applyMiddleware({ app });
	app.listen(PORT, () => {
		console.log('App is running on PORT', PORT);
		console.log(`Graphql endpoint is on http://localhost:${PORT}${apolloServer.graphqlPath}`);
	});
}

startServer()
	.then(() => {
		console.log('hello')
	})
	.catch(e => {
		console.log(e);
	});

// 1 Query for getting all of the Users in the database
// 1 Mutation for creating 1 user
// Bonus
// create a query called user that returns a user and takes 1 argument. an ID
