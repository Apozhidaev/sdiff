function first(source, target, i, j) {
    for (; i < source.length && j < target.length; ++i, ++j) {
        if (source[i] === target[j]) {
            return {
                source: i,
                target: j
            };
        }
    }
    throw new Error('cannot find first match');
}

function match(source, target, i, j, max) {
    var count = 0;
    for (; i < source.length && j < target.length; ++i, ++j) {
        if (source[i] === target[j]) {
            ++count;
        }
        if (count + source.length - i < max
            || count + target.length - j < max) {
            return -1;
        }
    }
    return count;
}

function find(source, target) {
    var i = 0;
    var j = 0;
    var count = 0;
    var matches = {
        source: 0,
        target: 0,
        count: 0
    };
    for (; i < source.length - matches.count; ++i) {
        for (j = 0; j < target.length - matches.count; ++j) {
            count = match(source, target, i, j, matches.count);
            if (count > matches.count) {
                matches.source = i;
                matches.target = j;
                matches.count = count;
            }
        }
    }
    return matches;
}

function complexDiff(source, target, options) {
    var matches = find(source, target);

    if (matches.count <= options.chunk) {
        return target;
    }

    var indexes = first(source, target, matches.source, matches.target);

    var subSource = source.substr(indexes.source);
    var subTarget = target.substr(indexes.target);

    return {
        offset: indexes.source,
        prefix: target.substr(0, indexes.target),
        diff: compare(subSource, subTarget, options)
    };

}

function compare(source, target, options) {
    source = source || '';
    target = target || '';
    options = options || {};
    options.chunk = options.chunk || 30; // '{"value":"","begin":0,"end":0}'.length


    if (source == target) return null;

    if (!source || target.length <= options.chunk) {
        return options.strict ? {
            value: target,
            begin: 0,
            end: 0
        } : target;
    }

    var begin = 0;
    while (begin < target.length
        && begin < source.length
        && target[begin] === source[begin]) {
        ++begin;
    }

    var end = 0;
    var i = source.length - 1;
    var j = target.length - 1;
    while (i >= 0
        && j >= 0
        && target[j] === source[i]) {
        --i;
        --j;
        ++end;
    }

    var value;
    if (begin > j) {
        end = target.length - begin;
        value = '';
    } else {
        value = target.substring(begin, j + 1);
        if (!options.basic && value.length > options.chunk) {
            var subSource = source.substring(begin, i + 1);
            value = complexDiff(subSource, value, options);
        }
    }

    var diff = {
        value: value
    };

    if (begin) {
        diff.begin = begin;
    }
    else if (options.strict) {
        diff.begin = 0;
    }

    if (end) {
        diff.end = end;
    }

    return diff;
};

function patch(source, diff) {

    if (typeof diff === 'string') {
        return diff;
    }

    if (typeof diff !== 'object') {
        throw new Error('error should be string or object');
    }

    diff.begin = diff.begin || 0;
    diff.end = diff.end || 0;

    var value;
    if (typeof diff.value === 'object') {
        var complex = diff.value;
        var subSource = source.substring(diff.begin + complex.offset, source.length - diff.end);
        value = complex.prefix + patch(subSource, complex.diff);
    }
    else if (typeof diff.value === 'string') {
        value = diff.value;
    }
    else {
        throw new Error('diff.value should be string or object');
    }

    return source.substr(0, diff.begin)
        + value
        + source.substr(source.length - diff.end, diff.end);
};


module.exports.compare = compare;
module.exports.patch = patch;