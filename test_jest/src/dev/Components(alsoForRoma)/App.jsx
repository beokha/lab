import React, { Component } from "react";
//import ApiData from './ApiData/ApiData.jsx';

import api from '../forRoma/api';

export default class App extends Component  {

    constructor(props) {
        super(props);

        this.state = {
            apiData: 0
        }

        this.getTransformData().then((res) => {
            this.setSate({
                apiData: res
            })

            console.log(this.state);
        })

        console.log(this.state);
    }

    getTransformData() {
        return api.getData().then(function (res) {
            return api.transformData(res);
        });
    }

    render() {
        return (
            <div className="container">
                <p> Hello world! </p>

                {/*{<ApiData data={this.state.apiData} />}*/}
            </div>
        )
    }
}