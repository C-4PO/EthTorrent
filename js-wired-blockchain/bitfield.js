// send a bitfield to the peer
wire.bitfield(buffer);
wire.on('bitfield', function(bitfield) {
	// bitfield received from the peer
});

// send a have message indicating that you have a piece
wire.have(pieceIndex);
wire.on('have', function(pieceIndex) {
	// peer has sent you a have message
});

wire.peerPieces[i]; // returns true if peer has piece i