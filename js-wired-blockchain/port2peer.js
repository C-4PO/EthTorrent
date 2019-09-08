// send your port to the peer
wire.port(dhtPort);
wire.on('port', function(dhtPort) {
	// peer has sent a port to us
});