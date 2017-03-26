module.exports.calc = function (source, target) {

    if (source == target) return null;

    if (!target) {
        return {
            value: '',
            begin: 0,
            end: 0
        };
    }

    if (!source) {
        return {
            value: target,
            begin: 0,
            end: 0
        };
    }

    var begin = 0;
    while (begin < target.length
        && begin < source.length
        && target[begin] == source[begin]) {
        ++begin;
    }

    var end = 0;
    var i = target.length - 1;
    var j = source.length - 1;
    while (i >= 0
        && j >= 0
        && target[i] == source[j]) {
        --i;
        --j;
        ++end;
    }

    var value;

    if (begin > i) {
        end = target.length - begin;
        value = '';
    } else {
        value = target.substring(begin, i + 1);
    }

    var diff = {
        value: value,
        begin: begin,
        end: end
    };

    return diff;
};

module.exports.restore = function (source, diff) {
    return source.substr(0, diff.begin)
        + diff.value
        + source.substr(source.length - diff.end, diff.end);
};