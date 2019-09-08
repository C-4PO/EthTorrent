wire.uploaded; // number of bytes uploaded
wire.downloaded; // number of bytes downloaded

wire.on('download', function(numberOfBytes) {
	...
});
wire.on('upload', function(numberOfBytes) {
	...
});