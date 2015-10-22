var name = require('./lib/name');
var os2 = require('./lib/os2');

module.exports = function(data) {
	var sfntVersion = data.readInt32BE(0);

	if (sfntVersion !== 0x00010000 && sfntVersion !== 0x4F54544F) {
		return Promise.reject();
	}

	var openType = {
		version: sfntVersion,
		type: sfntVersion === 0x00010000 ? 'TTF' : 'OTF'
	};

	var numTables = data.readUInt16BE(4);
	for (var i = 0; i < numTables; i++) {
		var tag = data.readUInt32BE(12 + 16 * i);
		var checkSum = data.readUInt32BE(16 + 16 * i);
		var offset = data.readUInt32BE(20 + 16 * i);
		var length = data.readUInt32BE(24 + 16 * i);
		var table = data.slice(offset, offset + length);

		switch (tag) {
			case 0x6E616D65:
				openType["name"] = name(table);
				break;
			case 0x4F532F32:
				openType["OS/2"] = os2(table);
				break;
		}
	}

	return Promise.resolve(openType);
};
