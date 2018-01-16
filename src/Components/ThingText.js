import React, {Component} from 'react';

class ThingText extends Component {
    render() {
        let text = null
        if (Array.isArray(this.props)){
            text = this.props.map((thing, key) => {
                console.log(thing);
                <div key={key}>{thing}</div>
            })
        } else {
            text = <div>{this.props}</div> 
        }
            console.log(this.props)

        return (
            this.props.map((thing, key) => {
                console.log(thing);
                <div key={key}>{thing}</div>
            })
        );
    }
}

export default ThingText;
