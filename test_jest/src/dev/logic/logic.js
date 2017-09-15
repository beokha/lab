exports.sum = function (a,b) {
    return a + b;
}

exports.exception = function () {
    throw new ConfigError("Error");
}

exports.async = function () {
    return new Promise(function (resolve) {
        setTimeout(() => {
            resolve("heres");
        }, 1500);
    });
}