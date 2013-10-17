var child_process = require('child_process');

exports.convert = function (input, output, options, cb) {
    output = output || (input + '.swf');
    if (options) {
        options = ' ' + options;
    } else {
        options = ' -T 9 ';
    }
    child_process.exec('pdf2swf ' + input + ' -o ' + output  + options, function (err, stdout, stderr) {
        if (! err) {
            return cb(null);
        }
        if (/65536/.test(stdout)) {
            //re convert with option -s poly2bitmap
            child_process.exec('pdf2swf ' + input + ' -o ' + output  + options + ' -s poly2bitmap', function (_err, _stdout, _stderr) {
                if (! _err) {
                    return cb(null);
                }
                return cb(_stderr);
            });
        } else {
            return cb(stderr);
        }
    });
}

exports.info = function (pdf, cb) {
    child_process.exec('pdfinfo ' + pdf, function (err, stdout, stderr) {
        if (! err) {
            var _arr = stdout.split('\n');
            var meta = {};
            for (var i in _arr) {
                _arr[i] = _arr[i].split(/:\s{3,}/);
                if (_arr[i].length == 2 && _arr[i][0]) {
                    meta[_arr[i][0]] = _arr[i][1];
                }
            }
            return cb(null, meta);
        }
        return cb(stderr);
    });
}

exports.screenshot = function (input, output, page, cb) {
    page = page || 0;
    output = output || (input + '.jpg');
    child_process.exec('convert -density 150 ' + input + '[' + page + '] ' + output, function (err, stdout, stderr) {
        if (! err) {
            return cb(null, output);
        }
        return cb(stderr);
    });
}