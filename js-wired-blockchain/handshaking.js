// send a handshake to the peer
wire.handshake(infoHash, peerId, {dht:true});
wire.on('handshake', function(infoHash, peerId, extensions) {
	// receive a handshake
});