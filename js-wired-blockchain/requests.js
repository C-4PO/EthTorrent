// request a piece from a peer
wire.request(pieceIndex, offset, length, function(err, block) {
	if (err) {
		// there was an error (peer has started choking us etc)
		return;
	}
	// got piece
});

// cancel a request to a peer
wire.cancel(pieceIndex, offset, length);

// receive a request from a peer
wire.on('request', function(pieceIndex, offset, length, callback) {
	// ... read piece ...
	callback(null, piece); // respond back to the peer
});

wire.requests;     // list of requests we currently have pending {piece, offset, length}
wire.peerRequests; // list of requests the peer currently have pending {piece, offset, length}

wire.setTimeout(5000); // head request should take a most 5s to finish