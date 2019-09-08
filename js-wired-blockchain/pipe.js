var pwp = require('peer-wire-protocol');
var net = require('net');

net.createServer(function(socket) {
	var wire = pwp();

	// pipe to and from the protocol
	socket.pipe(wire).pipe(socket);

	wire.on('handshake', function(infoHash, peerId) {
		// lets emit a handshake of our own as well
		wire.handshake(Buffer.from('my info hash'), Buffer.from('my peer id'));
	});

	wire.on('unchoke', function() {
		console.log('peer is no longer choking us: '+wire.peerChoking);
	});
}).listen(6881);