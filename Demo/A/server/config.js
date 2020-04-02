module.exports = {
	PORT: 5678,
	CROS: {
		ALLOW_ORIGIN: '*',
		ALLOW_METHODS: 'PUT,POST,GET,DELETE,OPTIONS,HEAD',
		HEADERS: 'Content-Type,Content-Length,Authorization, Accept,X-Requested-With',
		CREDENTIALS: false
	}
};