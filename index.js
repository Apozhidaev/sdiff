module.exports.getDiff = function (before, after) {

    if (before == after) return null;

    var i = 0;
    for (; i < after.length && i < before.length; i++) {
        if (after[i] != before[i]) {
            break;
        }
    }

    var j = 0;
    var k = after.length - 1;
    var l = before.length - 1;
    for (; k >= 0 && l >= 0; j++ , k-- , l--) {
        if (after[k] != before[l]) {
            break;
        }
    }

    var value;

    if (i > k) {
        j = after.length - i;
        value = '';
    } else {
        value = after.substring(i, k + 1);
    }

    var diff = {
        value: value,
        start: i,
        end: j
    };

    return diff;
};

module.exports.setDiff = function (before, diff) {
    return before.substr(0, diff.start) + diff.value + before.substr(before.length - diff.end, diff.end);
};