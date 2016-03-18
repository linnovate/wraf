import React from "react";

import Title from "./Title";

import "bootstrap-loader";
import './header.scss';

export default class Header extends React.Component {
    handleChange(e) {
        const title = e.target.value;
        this.props.changeTitle(title);
    }

    render() {
        return (
            <div class="col-md-7 center-block float-none">
                <div class="row">
                    <div class="head-logo"><img src={require('./wix_logo.png')} alt=""/></div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb20 input-group-lg">
                        <input type="text"
                               class="form-control"
                               value={this.props.title}
                               onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="col-md-6"><Title title={this.props.title}/></div>
                </div>
            </div>
        );
    }
}