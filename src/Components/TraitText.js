import React, {Component} from 'react';
import ThingText from './ThingText'

import './TraitText.css'

class TraitText extends Component {

    render() { 
        if (!this.props.trait){
            return null;
        }
        let text = null
        if (Array.isArray(this.props.trait))  {//
            text = this
                .props
                .trait
                .map((trait, key) => {
                    return (
                        <div key={key} className='trait-text'>
                            <h4>{trait.name}</h4>
                            <ThingText text={trait.text}></ThingText>
                        </div>
                    )
                })
        } else {
            text = <div className='trait-text'>
                <h4>{this.props.trait.name}:</h4>
                <ThingText text={this.props.trait.text}></ThingText>
            </div>
        }

        return (text);
    }
}

export default TraitText;
