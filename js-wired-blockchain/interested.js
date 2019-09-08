wire.peerInterested; // is the peer interested in us?
wire.amInterested; // are we interested in the peer?

wire.on('interested', function() {
	// peer is now interested
});
wire.on('uninterested', function() {
	// peer is no longer interested
});