var expect = require('chai').expect;
var sdiff = require('./index');

describe('default tests', function () {

    it('test 1', function () {
        var source = 'aabbcc';
        var target = 'aaqqcc';
        var changes = sdiff.extract(source, target, { chunk: 1 });
        expect(sdiff.patch(source, changes)).to.eq(target);
    });

    it('test 2', function () {
        var source = 'aabb';
        var target = 'aaqq';
        var changes = sdiff.extract(source, target, { chunk: 1 });
        expect(sdiff.patch(source, changes)).to.eq(target);
    });

    it('test 3', function () {
        var source = 'bbcc';
        var target = 'qqcc';
        var changes = sdiff.extract(source, target, { chunk: 1 });
        expect(sdiff.patch(source, changes)).to.eq(target);
    });

    it('test 4', function () {
        var source = 'aabbcc';
        var target = 'aacc';
        var changes = sdiff.extract(source, target, { chunk: 1 });
        expect(sdiff.patch(source, changes)).to.eq(target);
    });

    it('test 5', function () {
        var source = 'aacc';
        var target = 'aaqqcc';
        var changes = sdiff.extract(source, target, { chunk: 1 });
        expect(sdiff.patch(source, changes)).to.eq(target);
    });

    it('test 6', function () {
        var source = 'aabbcc';
        var target = '';
        var changes = sdiff.extract(source, target, { chunk: 1 });
        expect(sdiff.patch(source, changes)).to.eq(target);
    });

    it('test 7', function () {
        var source = '';
        var target = 'aaqqcc';
        var changes = sdiff.extract(source, target, { chunk: 1 });
        expect(sdiff.patch(source, changes)).to.eq(target);
    });

    it('test 8', function () {
        var source = 'aabbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccggcccc';
        var target = 'aayyyyyyycccccccccccccccccccccccccccccccccccccycctcccc';
        var changes = sdiff.extract(source, target);
        console.log(changes);
        expect(sdiff.patch(source, changes)).to.eq(target);
    });

});

describe('tests of methods', function () {

    describe('extract tests', function () {

        it('test 1', function () {
            var source = 'aabbc';
            var target = 'aaqqc';
            var changes = sdiff.extract(source, target, { chunk: 1 });
            expect(changes.length).to.eq(3);
            expect(changes[0].start).to.eq(0);
            expect(changes[0].length).to.eq(2);
            expect(changes[1].value).to.eq('qq');
            expect(changes[2].start).to.eq(4);
            expect(changes[2].length).to.eq(1);
        });

        it('test 2', function () {
            var source = 'aabbcc';
            var target = 'aabbcc';
            var changes = sdiff.extract(source, target);
            expect(changes).to.eq(null);
        });

        it('test 3', function () {
            var changes = sdiff.extract();
            expect(changes).to.eq(null);
        });

    });

    describe('patch tests', function () {

        it('test 1', function () {
            var source = 'aabbc';
            var target = 'aaqqc';
            var changes = [{
                start: 0,
                length: 2
            },
            {
                value: 'qq'
            },
            {
                start: 4,
                length: 1
            }];
            expect(sdiff.patch(source, changes)).to.eq(target);
        });

    });

});


describe('tests of options', function () {

    describe('chunk tests', function () {

        it('test 1', function () {
            var source = 'abbc';
            var target = 'aqqc';
            var changes = sdiff.extract(source, target, { chunk: 1 });
            expect(changes.length).to.eq(3);
            expect(changes[0].start).to.eq(0);
            expect(changes[0].length).to.eq(1);
            expect(changes[1].value).to.eq('qq');
            expect(changes[2].start).to.eq(3);
            expect(changes[2].length).to.eq(1);
            expect(sdiff.patch(source, changes)).to.eq(target);
            changes = sdiff.extract(source, target, { chunk: 2 });
            expect(changes.length).to.eq(1);
            expect(changes[0].value).to.eq(target);
            expect(sdiff.patch(source, changes)).to.eq(target);
        });

    });

});