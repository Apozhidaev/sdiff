var expect = require('chai').expect;
var sdiff = require('./index');

describe('default tests', function () {

    it('test 1', function () {
        var source = 'aabbcc';
        var target = 'aaqqcc';
        var diff = sdiff.compare(source, target, { chunk: 1 });
        expect(sdiff.patch(source, diff)).to.eq(target);
    });

    it('test 2', function () {
        var source = 'aabb';
        var target = 'aaqq';
        var diff = sdiff.compare(source, target, { chunk: 1 });
        expect(sdiff.patch(source, diff)).to.eq(target);
    });

    it('test 3', function () {
        var source = 'bbcc';
        var target = 'qqcc';
        var diff = sdiff.compare(source, target, { chunk: 1 });
        expect(sdiff.patch(source, diff)).to.eq(target);
    });

    it('test 4', function () {
        var source = 'aabbcc';
        var target = 'aacc';
        var diff = sdiff.compare(source, target, { chunk: 1 });
        expect(sdiff.patch(source, diff)).to.eq(target);
    });

    it('test 5', function () {
        var source = 'aacc';
        var target = 'aaqqcc';
        var diff = sdiff.compare(source, target, { chunk: 1 });
        expect(sdiff.patch(source, diff)).to.eq(target);
    });

    it('test 6', function () {
        var source = 'aabbcc';
        var target = '';
        var diff = sdiff.compare(source, target, { chunk: 1 });
        expect(sdiff.patch(source, diff)).to.eq(target);
    });

    it('test 7', function () {
        var source = '';
        var target = 'aaqqcc';
        var diff = sdiff.compare(source, target, { chunk: 1 });
        expect(sdiff.patch(source, diff)).to.eq(target);
    });

    it('test 8', function () {
        var source = 'aabbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccggcccc';
        var target = 'aayyyyyyycccccccccccccccccccccccccccccccccccccycctcccc';
        var diff = sdiff.compare(source, target);
        expect(sdiff.patch(source, diff)).to.eq(target);
    });

});

describe('tests of methods', function () {

    describe('compare tests', function () {

        it('test 1', function () {
            var source = 'aabbc';
            var target = 'aaqqc';
            var diff = sdiff.compare(source, target, { chunk: 1 });
            expect(diff.value).to.eq('qq');
            expect(diff.begin).to.eq(2);
            expect(diff.end).to.eq(1);
        });

        it('test 2', function () {
            var source = 'aabbcc';
            var target = 'aabbcc';
            var diff = sdiff.compare(source, target);
            expect(diff).to.eq(null);
        });

        it('test 3', function () {
            var diff = sdiff.compare();
            expect(diff).to.eq(null);
        });

    });

    describe('patch tests', function () {

        it('test 1', function () {
            var source = 'aabbc';
            var target = 'aaqqc';
            var diff = {
                value: 'qq',
                begin: 2,
                end: 1
            };
            expect(sdiff.patch(source, diff)).to.eq(target);
        });

    });

});


describe('tests of options', function () {

    describe('basic tests', function () {

        it('test 1', function () {
            var source = 'aabbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccggcccc';
            var target = 'aayyyyyyycccccccccccccccccccccccccccccccccccccycctcccc';
            var diff = sdiff.compare(source, target, { basic: true });
            expect(diff.value).to.eq('yyyyyyycccccccccccccccccccccccccccccccccccccycct');
            expect(diff.begin).to.eq(2);
            expect(diff.end).to.eq(4);
            expect(sdiff.patch(source, diff)).to.eq(target);
        });

    });

    describe('chunk tests', function () {

        it('test 1', function () {
            var source = 'abbc';
            var target = 'aqqc';
            var diff = sdiff.compare(source, target, { chunk: 3 });
            expect(diff.value).to.eq('qq');
            expect(diff.begin).to.eq(1);
            expect(diff.end).to.eq(1);
            expect(sdiff.patch(source, diff)).to.eq(target);
            diff = sdiff.compare(source, target, { chunk: 4 });
            expect(diff).to.eq(target);
            expect(sdiff.patch(source, diff)).to.eq(target);
        });

    });

    describe('strict tests', function () {

        it('test 1', function () {
            var source = 'aabbcc';
            var target = 'ttyyuu';
            var diff = sdiff.compare(source, target, { strict: true });
            expect(diff.value).to.eq(target);
            expect(diff.begin).to.eq(0);
            expect(diff.end).to.eq(0);
            var diff = sdiff.compare(source, target);
            expect(diff).to.eq(target);
            expect(sdiff.patch(source, diff)).to.eq(target);
        });

    });

});