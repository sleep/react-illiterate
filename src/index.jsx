import React, {PropTypes, unmountComponentAtNode} from "react";

export default React.createClass({
    propTypes: {
        classes: PropTypes.object.isRequired
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
    },
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});
