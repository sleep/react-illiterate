import React, {PropTypes, unmountComponentAtNode} from "react";

export default {
    propTypes: {
        src: PropTypes.string.isRequired,
        classes: PropTypes.object, //Object with React Component keys?
    },
    componentWillMount() {
        this.mountedNodes = [];
    },
    componentDidMount() {
        let classes = this.props.classes;
        let keys = Object.keys(classes);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let node = document.getElementById(key);
            let element = React.createElement(classes[key]);
            React.render(element, node);
            this.mountedNodes.push(node);
        }
    },
    componentWillUnmount() {
        for (let i = 0; i < this.mountedNodes.length; i++) {
            unmountComponentAtNode(this.mountedNodes[i]);
        }
    }
};

//TODO move to async
