import React, {Component} from 'react';

class ModifierText extends Component {

    //-bonus -ability score -skills

    render() {
        if (!this.props.modifier){
            return null;
        }

        let text = null
        if (Array.isArray(this.props.modifier)) {
            text = this
                .props
                .modifier
                .map((modifier, key) => {
                    return <p key={key} className='capitalize'><strong>{modifier['-category']}:</strong> {modifier['#text']}</p>
                })
        } else {
            text = <p className='capitalize'><strong>{this.props.modifier['-category']}:</strong> {this.props.modifier['#text']}</p>
        }

        return (text);
    }
}

export default ModifierText;
