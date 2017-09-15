describe("logic.js: ", () => {

    let logic;
    beforeEach(() => {
        logic = require('../logic/logic');
    })


    test("2+3 should return 5", () => {
        let sum = logic.sum;

        expect(sum(2,3)).toBe(5);
    });


    test("should throw exception", () => {
        const exception = logic.exception;

        expect(exception).toThrow('Error');
    });


    test("async method #1", done => {
        const asyncMthd = logic.async;

        function callBack(data) {
            expect(data).toBe("heres");
            done();
        }

        asyncMthd().then(callBack);
    });

    test("async method #2", () => {
        const asyncMthd = logic.async;

        expect.assertions(1);
        return asyncMthd().then(data => {
            expect(data).toBe("heres");
        })
    });

    test("async method #3", () => {
        const asyncMthd = logic.async;

        expect.assertions(1);
        return expect(asyncMthd()).resolves.toBe("heres");
    });

    /*test("async method #4", async () => {
        expect.assertions(1);
        const data = await asyncMthd();
        expect(data).toBe("heres");
    });*/
})