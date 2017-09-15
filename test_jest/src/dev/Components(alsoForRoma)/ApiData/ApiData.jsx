import React, { Components } from 'react';

export default class ApiData extends Components {

    constructor(props) {
        super(props);

        /*this.state = {
            data: props.data
        }*/
    }

    render() {
        return (
            <div className="api-data">
                {
                    Object.keys(this.props.data).map(function (index, value) {
                        return <div> {value} </div>;
                    })
                }
            </div>
        )
    }
}
