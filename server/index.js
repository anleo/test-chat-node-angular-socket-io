const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
	url: 'ws://localhost:3000',
	path: '/test',
	transport: 'websocket',
});

const ON_CONNECTION = 'connection';
const ON_DISCONNECTION = 'disconnection';
const ALL_MESSAGES = 'get-messages';
const GET_MESSAGE = 'message';
const SET_ME = 'set-me';
const GET_USERS = 'get-users';
const REMOVE_USER = 'remove-user';

const messages = [];
const users = [];

io.on(ON_CONNECTION, (socket) => {
	io.emit(ALL_MESSAGES, messages);

	socket.on(GET_MESSAGE, (msg) => {
		messages.push({
			...msg,
			date: Date.now(),
		});

		io.emit(ALL_MESSAGES, messages);
	});

	socket.on(SET_ME, (user) => {
		const alreadyPresent = users.find(usr => +user.id === +usr.id);

		if (!alreadyPresent) {
			users.push(user);
		}

		io.emit(GET_USERS, users);
	});

	socket.on(REMOVE_USER, (userId) => {
		const idx = users.findIndex(usr => +userId === +usr.id);

		if (idx > 0) {
			users.splice(idx, 1);
			io.emit(GET_USERS, users);
		}
	});
});

httpServer.listen(3000);