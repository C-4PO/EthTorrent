wire.peerChoking; // is the peer choking us?
wire.amChoking; // are we choking the peer?

wire.on('choke', function() {
	// the peer is now choking us
});
wire.on('unchoke', function() {
	// peer is no longer choking us
});