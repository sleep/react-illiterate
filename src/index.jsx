import React, {PropTypes, unmountComponentAtNode} from "react";

export default React.createClass({
  propTypes: {
    src: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
  },
  componentWillMount() {
    this.mountedNodes = [];
  },
  componentDidMount() {
    let node = this.getDOMNode();
    let shadowRoot = node.createShadowRoot();
    shadowRoot.innerHTML = this.props.src;

    let classes = this.props.classes;
    let keys = Object.keys(classes);


    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let node = shadowRoot.getElementById(key);
      console.log(key, node);
      if (node === null) continue;

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
        <div/>
    );
  }
});


//TODO:
// - handle updating
// - Think about how to handle styling
