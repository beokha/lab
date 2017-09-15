describe("API:", () => {

    let api;
    beforeEach(() => {
        api = require('./api');
    });

    test("Return data should be array", done => {
        let apiData = api.getData;
        function callback(data) {
            expect(Array.isArray(data)).toBe(true);
            done();
        }

        apiData().then((data) => callback(data));
    });

    test("Should return needed data: ", () => {
        let apiData = api.getData;
        let expected =  [
            ['usd', 'buy', 10],
            ['usd', 'buy', 20],
            ['usd', 'sell', 30],
            ['usd', 'sell', 40],

            ['eur', 'buy', 50],
            ['eur', 'buy', 60],
            ['eur', 'sell', 70],
            ['eur', 'sell', 80]
        ];

        expect.assertions(1);
        return expect(apiData()).resolves.toEqual(expected);
    });

    test("Should transform data from array in object: ", () => {
        let dataLogic = api.transformData;
        let dataArray = [
            ['usd', 'buy', 10],
            ['usd', 'buy', 20],
            ['usd', 'sell', 30],
            ['usd', 'sell', 40],

            ['eur', 'buy', 50],
            ['eur', 'buy', 60],
            ['eur', 'sell', 70],
            ['eur', 'sell', 80]
        ];
        let expected = {eur: [110, 150], usd: [30, 70]};

        expect(dataLogic(dataArray)).toEqual(expected);
    });

    /*test("Should transform data from <<>> response: ", () => {


    })*/
})