// starts the keep alive
wire.setKeepAlive(true);
wire.on('keep-alive', function() {
	// peer sent a keep alive - just ignore it
});