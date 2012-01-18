BEM.TEST.decl({ block : 'i-bem', elem : 'ecma', modName : 'type', modVal : 'array' }, function(undefined) {

    describe('indexOf specs', function() {
        $.each([
            { data : [1, 2, 3], args : [1], res : 0 },
            { data : [1, 2, 3], args : [4], res : -1 },
            { data : [1, 2, 3, 2], args : [2, 2], res : 3 },
            { data : [1, 2, 3, 2], args : [1, 2], res : -1 },
            { data : [1, 2, 3, 2], args : [2, -1], res : 3 },
            { data : [1, 2, 3, 2], args : [2, -10], res : 1 }
        ], function(i, test) {
            it('should be correct result', function() {
                expect(test.data.indexOf.apply(test.data, test.args)).toEqual(test.res);
            });
        });
    });

    describe('forEach specs', function() {
        it('should be callback called on every item', function() {
            var data = [1, 2, 3, 4],
                spy = jasmine.createSpy();

            data[4] = undefined;
            data.forEach(spy);
            expect(spy.callCount).toEqual(5);
        });

        it('should be callback\'s arguments valid', function() {
            var data = [1];
            data.forEach(function(item, i, arr) {
                expect(i).toBe(0);
                expect(item).toBe(1);
                expect(arr).toBe(data);
            });
        });

        it('should be callback\'s context valid', function() {
            var ctx = {};
            [1].forEach(function() {
                expect(this).toBe(ctx);
            }, ctx);
            [1].forEach(function() {
                expect(this).toBe(window);
            });
        });
    });

    describe('map specs', function() {
        it('should be callback called on every item', function() {
            var data = [1, 2, 4, 5],
                spy = jasmine.createSpy();
            data[5] = undefined;

            data.map(spy);
            expect(spy.callCount).toEqual(5);
        });

        it('should be result valid', function() {
            expect([1, 2, 5, 10].map(function(item) {
                return item + 1;
            })).toEqual([2, 3, 6, 11]);
        });

        it('should be callback\'s arguments valid', function() {
            var data = [1];
            data.map(function(item, i, arr) {
                expect(i).toBe(0);
                expect(item).toBe(1);
                expect(arr).toBe(data);
            });
        });

        it('should be callback\'s context valid', function() {
            var ctx = {};
            [1].map(function() {
                expect(this).toBe(ctx);
            }, ctx);
            [1].map(function() {
                expect(this).toBe(window);
            });
        });
    });

    describe('filter specs', function() {
        it('should be callback called on every item', function() {
            var data = [1, 2, 4, 5],
                spy = jasmine.createSpy();
            data[5] = undefined;

            data.filter(spy);
            expect(spy.callCount).toEqual(5);
        });

        it('should be result valid', function() {
            expect([true, false, true].filter(function(item) {
                return item;
            })).toEqual([true, true]);
        });

        it('should be callback\'s arguments valid', function() {
            var data = [1];
            data.filter(function(item, i, arr) {
                expect(i).toBe(0);
                expect(item).toBe(1);
                expect(arr).toBe(data);
            });
        });

        it('should be callback\'s context valid', function() {
            var ctx = {};
            [1].filter(function() {
                expect(this).toBe(ctx);
            }, ctx);
            [1].filter(function() {
                expect(this).toBe(window);
            });
        });
    });

    describe('isArray specs', function() {
        it('should array\'s type to be Array', function() {
            expect(Array.isArray([])).toBeTruthy();
            expect(Array.isArray(new Array())).toBeTruthy();
        });

        it('shouldn\'t another types to be Array', function() {
            expect(Array.isArray(undefined)).toBeFalsy();
            expect(Array.isArray(1)).toBeFalsy();
            expect(Array.isArray(true)).toBeFalsy();
            expect(Array.isArray({})).toBeFalsy();
            expect(Array.isArray('test')).toBeFalsy();
            expect(Array.isArray(null)).toBeFalsy();
        });
    });

});