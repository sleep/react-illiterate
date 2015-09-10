import React, {PropTypes} from "react";
import Illiterate from "./index.jsx";

export default React.createClass({
    mixins: [Illiterate],
    propTypes: {
        src: PropTypes.string.isRequired,
        classes: PropTypes.object
    },
    render() {
        return (
            <div ref="text"
                    dangerouslySetInnerHTML={{__html: this.props.src}}
                    />
        )
    }
});
