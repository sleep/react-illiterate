import React, {PropTypes} from "react";
import IlliterateSimple from "../src/IlliterateSimple.jsx";

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
    }),
    test2: React.createClass({
        render() {
            return (
                <div>
                    test2
                </div>
            );
        }
    }),
    test3: React.createClass({
        render() {
            return (
                <div>
                    test3
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
            <IlliterateSimple src={text}
                              classes={classes} />
        );

        return (
            <div>
                <h1>root</h1>
                <button onClick={this.onClick}>toggle</button>
                {this.state.show ? thing: null}
            </div>
        );
    }
});

React.render((
    <Root/>
), document.body);