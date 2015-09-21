import React, {PropTypes, unmountComponentAtNode} from "react";


//TODO: split src, apply diffs.
export default React.createClass({
  propTypes: {
    src: PropTypes.string.isRequired,
    classes: PropTypes.object
  },
  componentWillMount() {
    this.elements = {}; //Memoize the elements in a map.
  },


  // This should be a idempotent, as React.render(element, node) is idempotent
  __mountNodes() {
    //invariant: nodes are not mounted
    let shadowRoot = this.shadowRoot;
    let classes = this.props.classes;



    //set innerHTML
    shadowRoot.innerHTML = this.props.src;

    // do not mount stuff if there is nothing to mount
    if (!classes) return;

    let keys = Object.keys(classes)
                     .filter((key) => shadowRoot.getElementById(key));

    //invariant: shadowRoot.getElementById(key) exists for all keys
    //make elements

    this.elements = keys.reduce((sum, key) => {
      let elem = this.elements[key];
      if (elem) {
        return Object.assign(sum, {[key]: elem});
      }
      return Object.assign(sum, {
        [key]: {
          DOMNode: document.createElement("div"),
          element: React.createElement(classes[key])
        }
      });
    }, {});

    //render elements;
    keys.forEach((key) => {
      let {element, DOMNode} = this.elements[key];
      React.render(element, DOMNode);
      shadowRoot.getElementById(key).appendChild(DOMNode);
    });


  },


  __unmountNodes(nodes) {
    nodes.forEach((node) => {unmountComponentAtNode(node)});
  },

  componentDidMount() {
    let node = this.getDOMNode();
    let shadowRoot = this.shadowRoot = node.createShadowRoot();

    this.__mountNodes();
  },

  componentDidUpdate(prevProps) {
    let {elements} = this;
    if (prevProps.classes){
        //unmount existing nodes
        let nodes = Object.keys(elements)
                        .map((key) => elements[key].DOMNode);
        this.__unmountNodes(nodes);
    }

    //(re-)mount
    this.__mountNodes();
  },

  componentWillUnmount() {
    let {classes} = this.props;
    let {elements, shadowRoot} = this;

    if (classes) {
        let nodes = Object.keys(elements)
                        .map((key) => elements[key].DOMNode);

        this.__unmountNodes(nodes);
    }
    //remove child DOM Nodes?
    Object.keys(elements).forEach((key) => {
      let elem = elements[key];
      console.log(elem);
      elem.DOMNode.remove();
    });
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
