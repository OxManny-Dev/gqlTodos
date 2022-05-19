const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
	firstName: String,
	lastName: String,
	password: String,
});
// hooks
// in order to do something before data is saved to the database  using mongoose
// we can make use of the 'pre' hook
/*
* {
*   name: 'Naruto',
*   lastName: 'Uzumaki',
*   password: '123'
* }
*
* * {
*   name: 'Naruto',
*   lastName: 'Jucaban',
*   password: '123'
* }
*
* */
userSchema.pre('save', async function(next) {
	// this = the user about to be saved in the database
	// or a user that's already in the database
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		// hashing is a 1 way street
		this.password = await bcrypt.hash(this.password, saltRounds);
	}
	next();
});


module.exports = model('User', userSchema);
