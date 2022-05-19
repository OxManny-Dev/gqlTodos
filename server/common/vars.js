// this should be in a .env file
// this is the secret to decode our JWT (Json Web Token)
const secret = 'dsaiuhdsay0odgad07asged680ydbsayudgb07812g341gdasoyudas';

// expiration for JWT
const expiration = '2h';

module.exports = {
	secret,
	expiration,
}
