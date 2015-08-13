var path = require('path');
var fs = require('fs');
var opentype = require('../');
var assert = require('assert');
var expectedTtf = require('./expected.ttf.json');
var expectedOtf = require('./expected.otf.json');

describe('opentype-parser', function () {
	it('can parse .ttf fonts', function (done) {
		fs.readFile(path.join(__dirname, 'pathFont.ttf'), function (err, contents) {
			if (err) throw err;
			opentype(contents).then(function (results) {
				assert.deepEqual(results, expectedTtf);
				done();
			}, function () {
				assert.fail("Parsing font failed");
			});
		});
	});
	it('can parse .otf fonts', function (done) {
		fs.readFile(path.join(__dirname, 'pathFont.otf'), function (err, contents) {
			if (err) throw err;
			opentype(contents).then(function (results) {
				assert.deepEqual(results, expectedOtf);
				done();
			}, function () {
				assert.fail("Parsing font failed");
			});
		});
	});
});
