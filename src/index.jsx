import React, {PropTypes, unmountComponentAtNode} from "react";

export default React.createClass({
  propTypes: {
    src: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
  },
  componentWillMount() {
    this.elements = {}; //Memoize the elements in an map.
  },

  // This should be a idempotent, as React.render(element, node) is idempotent
  __mountNodes() {
    //invariant: nodes are not mounted
    let shadowRoot = this.shadowRoot;
    let classes = this.props.classes;


    //set innerHTML
    shadowRoot.innerHTML = this.props.src;

    let keys = Object.keys(classes)
          .filter((key) => shadowRoot.getElementById(key));

    //invariant: shadowRoot.getElementById(key) exists for all keys

    //make elements
    this.elements = keys.reduce((sum, key) => {
      return Object.assign(sum, {
        [key]: this.elements[key] || React.createElement(classes[key])
      });
    }, {});

    //render elements;
    keys.forEach((key) => {
      React.render(this.elements[key], shadowRoot.getElementById(key));
    });
  },


  __unmountNodes(nodes) {
    nodes.forEach((node) => {unmountComponentAtNode(node);});
  },

  componentDidMount() {
    let node = this.getDOMNode();
    let shadowRoot = this.shadowRoot = node.createShadowRoot();

    this.__mountNodes();
  },

  componentDidUpdate(prevProps) {
    //unmount existing nodes
    let toUnmount = Object.keys(prevProps.classes)
          .map((key) => this.shadowRoot.getElementById(key))
          .filter((node) => node);
    this.__unmountNodes(toUnmount);

    //(re-)mount
    this.__mountNodes();
  },

  componentWillUnmount() {
    let nodes = Object.keys(this.props.classes)
          .map((key) => this.shadowRoot.getElementById(key))
          .filter((node) => node);

    this.__unmountNodes(nodes);
  },
  shouldComponentUpdate(nextProps) {
    return true;
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
