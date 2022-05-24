const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, expiration } = require('../common/vars');

const {
	Todo,
	User,
} = require('../db');
const resolvers = {
	Query: {
		todos: async () => {
			try {
				return await Todo.find({});
			} catch (e) {
				throw new Error(e);
			}
		},
		users: async (root, args) => {
			try {
				return await User.find({});
			} catch (e) {
				throw new Error(e);
			}
		},
		user: async (root, {id}) => {
			try {
				return await User.findById(id);
			} catch (e) {
				throw new Error(e);
			}
		}
	},
	Mutation: {
		createTodo: async (root, { text, completed }, context) => {
			if (!context.user) {
				throw new AuthenticationError('You must be logged in to create a todo');
			}
			try {
				// { text: 'some stuff', completed: true  }
				return await Todo.create({
					text,
					completed,
					userId: context.user._id,
				});
			} catch (e) {
				throw new Error(e);
			}
		},
		createUser: async (root, {firstName, lastName, password}) => {
			try {
				return await User.create({firstName, lastName, password});
			} catch (e) {
				throw new Error(e);
			}
		},
		login: async (root, {firstName, password}, context) => {
			try {
				const foundUser = await User.findOne({firstName});

				if (!foundUser) {
					throw new AuthenticationError('No user found with this first name');
				}

				const isCorrectPassword = await bcrypt.compare(password, foundUser.password);

				if (!isCorrectPassword) {
					throw new AuthenticationError('Incorrect password');
				}

				// what data do we want to put in the token
				//
				const token = jwt.sign({ _id: foundUser._id, firstName: foundUser.firstName,}, secret, { expiresIn: expiration });

				return {
					token,
					user: foundUser,
				};

			} catch (e) {
				throw new Error(e);
			}

		},
	},
	User: {
		fullName: (root) => {
			return `${root.firstName} ${root.lastName}`;
		},
		sayGreetings: (root) => {
			return `Hi my name is ${root.firstName}`;
		},
		userTodos:async  (root) => {
			try {
				return await Todo.find({ userId: root._id })
			} catch (e) {
				console.log('97');
				throw new Error(e);
			}
		}
	},
	Todo: {
		user: async (root) => {
			try {
				return await User.findById(root.userId);
			} catch (e) {
				throw new Error(e);
			}
		}
	}
};
module.exports = resolvers;
