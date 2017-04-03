var same = require('./same');

function extract(source, target, options) {
    source = source || '';
    target = target || '';
    options = options || {};
    options.chunk = options.chunk || 35; // '{"start":5,"length":35}'.length + '{"value":""}'.length

    if (source == target) return null;

    var i, j = 0;
    var changes = [];
    var pieces = same(source, target, options.chunk);
    for (i = 0; i < pieces.length; ++i) {
        if (pieces[i].trg > j) {
            changes.push({
                value: target.substring(j, pieces[i].trg)
            });

        }
        changes.push({
            start: pieces[i].src,
            length: pieces[i].len
        });
        j = pieces[i].trg + pieces[i].len;
    }
    if (j < target.length) {
        changes.push({
            value: target.substr(j)
        });
    }

    return changes;
};

function patch(source, changes) {

    if (!Array.isArray(changes)) {
        throw new Error('should be array');
    }

    var value = '';
    for (var i = 0; i < changes.length; ++i) {
        if (changes[i].value) {
            value += changes[i].value;
        } else if ("start" in changes[i] || changes[i].length) {
            value += source.substr(changes[i].start || 0, changes[i].length);
        } else {
            throw new Error('unknown type of change');
        }
    }

    return value;
};


module.exports.extract = extract;
module.exports.patch = patch;