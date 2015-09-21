import React, {PropTypes} from "react";
import Illiterate from "../src/index.jsx";

import text0 from "./text0.md";
import text1 from "./text1.md";
import text2 from "./text2.md";

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
      demo: 0
    };
  },
  render() {
    return (
      <div>
        <button onClick={() => this.setState({demo: 0})}>Demo 0</button>
        <button onClick={() => this.setState({demo: 1})}>Demo 1</button>
        <button onClick={() => this.setState({demo: 2})}>Demo 2</button>
        {(() => {
          switch(this.state.demo) {
            case 0:
              return (
                <Illiterate key="0"
                src={text0}
                classes={classes}/>
              )
            case 1:
              return (
                <Illiterate key="1"
                src={text1}
                classes={classes}/>
              )
            case 2:
              return (
                <Illiterate key="2"
                src={text2} />
              )
          }
         })()}
      </div>
    );
  }
});

React.render(<Root/>, document.body);
