import React, {Component} from 'react';

class ThingText extends Component {
    render() {
        let text = null
        if (Array.isArray(this.props.text)){
            text = this.props.text.map((thing, key) => {
                return <p key={key}>{thing}</p>
            })
        } else {
            return <p>{this.props.text}</p>
        }

        return (
            text
        );
    }
}

export default ThingText;
