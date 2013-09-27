var pdf2swf = require('../lib/pdf2swf');

pdf2swf.convert('~/1.pdf', null, null, function (err) {
	console.log(err);
});