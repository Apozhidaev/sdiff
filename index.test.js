var expect = require('chai').expect;
var sdiff = require('./index');

describe('tests', function () {

    it('test 1', function () {
        var source = 'aabbcc';
        var target = 'aaqqcc';
        var diff = sdiff.calc(source, target);
        expect(sdiff.restore(source, diff)).to.eq(target);
    });

    it('test 2', function () {
        var source = 'aabb';
        var target = 'aaqq';
        var diff = sdiff.calc(source, target);
        expect(sdiff.restore(source, diff)).to.eq(target);
    });

    it('test 3', function () {
        var source = 'bbcc';
        var target = 'qqcc';
        var diff = sdiff.calc(source, target);
        expect(sdiff.restore(source, diff)).to.eq(target);
    });

    it('test 4', function () {
        var source = 'aabbcc';
        var target = 'aacc';
        var diff = sdiff.calc(source, target);
        expect(sdiff.restore(source, diff)).to.eq(target);
    });

    it('test 5', function () {
        var source = 'aacc';
        var target = 'aaqqcc';
        var diff = sdiff.calc(source, target);
        expect(sdiff.restore(source, diff)).to.eq(target);
    });

    it('test 6', function () {
        var source = 'aabbcc';
        var target = '';
        var diff = sdiff.calc(source, target);
        expect(sdiff.restore(source, diff)).to.eq(target);
    });

    it('test 7', function () {
        var source = '';
        var target = 'aaqqcc';
        var diff = sdiff.calc(source, target);
        expect(sdiff.restore(source, diff)).to.eq(target);
    });

});

describe('calc tests', function () {

    it('test 1', function () {
        var source = 'aabbc';
        var target = 'aaqqc';
        var diff = sdiff.calc(source, target);
        expect(diff.value).to.eq('qq');
        expect(diff.begin).to.eq(2);
        expect(diff.end).to.eq(1);
    });

    it('test 2', function () {
        var source = 'aabbcc';
        var target = 'aabbcc';
        var diff = sdiff.calc(source, target);
        expect(diff).to.eq(null);
    });

    it('test 3', function () {
        var diff = sdiff.calc();
        expect(diff).to.eq(null);
    });

});

describe('restore tests', function () {

    it('test 1', function () {
        var source = 'aabbc';
        var target = 'aaqqc';
        var diff = {
            value: 'qq',
            begin: 2,
            end: 1
        };
        expect(sdiff.restore(source, diff)).to.eq(target);
    });

});