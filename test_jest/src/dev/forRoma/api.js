exports.getData = function () {
    return new Promise(function (resolve, reject) {
        let result = [
            ['usd', 'buy', 10],
            ['usd', 'buy', 20],
            ['usd', 'sell', 30],
            ['usd', 'sell', 40],

            ['eur', 'buy', 50],
            ['eur', 'buy', 60],
            ['eur', 'sell', 70],
            ['eur', 'sell', 80]
        ];
        setTimeout(() => {
            resolve(result)
        }, 2000);
    })
}

exports.transformData = function (data) { // async

    if(data ===  null || data === undefined) {
        let curr = require("./api");
        data = curr.getData().then(function (resolve, reject) {
            resolve(data);
        });; // await
    }

    console.log(data);

    let resultObj = {};
    data.map((el) => {
        if(!resultObj.hasOwnProperty(el[0])) {
            resultObj[el[0]] = [];
        }

        if(el[1] === "buy") {
            if(resultObj[el[0]][0] === null || resultObj[el[0]][0] === undefined) {
                resultObj[el[0]][0] = 0;
            }

            resultObj[el[0]][0] += el[2];
        } else if(el[1] === "sell") {
            if(resultObj[el[0]][1] === null || resultObj[el[0]][1] === undefined) {
                resultObj[el[0]][1] = 0;
            }

            resultObj[el[0]][1] += el[2];
        }
    })

    return resultObj;
}