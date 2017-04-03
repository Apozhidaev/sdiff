function check(source, target, i, j) {
    var len = 0;
    for (; i < source.length && j < target.length; ++i, ++j) {
        if (source[i] !== target[j]) return len;
        ++len;
    }
    return len;
}

function intersect(first, second) {
    return second.trg < first.trg + first.len;
}

function tryAdd(pieces, piece) {
    if (pieces.length
        && intersect(pieces[pieces.length - 1], piece)) {
        if (pieces[pieces.length - 1].len < piece.len) {
            pieces[pieces.length - 1] = piece;
        }
    } else {
        pieces.push(piece);
    }
}

function same(source, target, chunk) {
    var i, j, piece, len;
    var pieces = [];
    for (j = 0; j <= target.length - chunk; ++j) {
        for (i = 0; i <= source.length - chunk; ++i) {
            len = check(source, target, i, j);
            if (len >= chunk) {
                tryAdd(pieces, {
                    src: i,
                    trg: j,
                    len: len
                });
            }
        }
    }
    return pieces;
}

module.exports = same;