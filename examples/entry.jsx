import React, {PropTypes} from "react";
import Illiterate from "../src/index.jsx";

import text from "./text.md";

const classes = {
    test1: React.createClass({
        getInitialState() {
            return {
                counter: 0
            }
        },
        componentDidMount () {
            this.interval = setInterval(function() {
                this.setState((prev) => ({counter: prev.counter + 1}));
            }.bind(this), 1000);
        },
        componentWillUnmount() {
            clearInterval(this.interval);
        },
        render() {
            return (
                <div>
                    {this.state.counter}
                </div>
            );
        }
    })
};


const Root = React.createClass({
    getInitialState() {
        return {
            show: true
        };
    },
    onClick() {
        this.setState((prev) => ({show: !prev.show}));
    },
    render() {
        let thing = (
            <Illiterate src={text}
                        classes={classes}/>
        );

        return (
            <div>
                <button onClick={this.onClick}>toggle</button>
                <div id="test1"> This does not get overridden!</div>
                {this.state.show ? thing: null}
            </div>
        );
    }
});

React.render(<Root/>, document.body);
