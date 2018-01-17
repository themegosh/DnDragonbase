import React, {Component} from 'react';
import ThingText from './ThingText'

class ActionText extends Component {

    getAttack (action){
        if (action.attack){
            return (
                <p>
                    <strong>Attack</strong>: {action.attack}
                </p>
            )
        }
    }

    render() { 
        if (!this.props.action){
            return null;
        }
        let text = null
        if (Array.isArray(this.props.action))  {
            text = this
                .props
                .action
                .map((action, key) => {
                    return (
                        <div key={key} className='action-text'>
                            <h4>{action.name}</h4>
                            <ThingText text={action.text}></ThingText>
                            {this.getAttack(action)}
                        </div>
                    )
                })
        } else {
            text = <div className='action-text'>
                <h4>{this.props.action.name}:</h4>
                <ThingText text={this.props.action.text}></ThingText>
                {this.getAttack(this.props.action)}
            </div>
        }

        return (text);
    }
}

export default ActionText;
