import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components(alsoForRoma)/App.jsx';

import logic from './logic/logic';

let api = require('./forRoma/api');

ReactDOM.render(<App />, document.getElementById('app'));

/*
console.log(logic.async());
console.log("here");
logic.async()
    .then(function(res) {
        console.log(res);
    })
    .then(function () {
    });*/

/*

console.log(api());
api().then(function (res) {
    console.log(res);
})*/

api.getData().then(function (res) {
    api.transformData(res);
})