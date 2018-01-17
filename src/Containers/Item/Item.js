import React, {Component} from 'react'
import ThingText from '../../Components/ThingText'
import ModifierText from '../../Components/ModifierText'
import PrettyObj from '../../Components/PrettyObj'
import Compendium from '../../Helpers/Compendium'

class Item extends Component {
    constructor(props) {
        super();
        this.state = {
            item: {}
        }
    }

    getItem(name) {
        Compendium
            .Items
            .forEach(anItem => {
                if (anItem.name === name) {
                    this.setState({item: anItem})
                }
            })
    }

    componentWillMount() {
        this.getItem(this.props.match.params.name)
    }

    componentWillReceiveProps(props) {
        this.getItem(props.match.params.name)
    }

    render() {

        let itemStats = Object
            .keys(this.state.item)
            .map(key => {
                if (key !== 'name' && key !== 'text' && key !== 'modifier') 
                    return <p key={key}>
                        <strong className='capitalize'>{key}:</strong>
                        {this.state.item[key]}</p>
            })

        return (
            <div>
                <div className='container'>
                    <div className="Item">
                        <h1>{this.state.item.name}</h1>
                        <hr/> {itemStats}
                        <ModifierText modifier={this.state.item.modifier}></ModifierText>
                        <hr/>
                        <ThingText text={this.state.item.text}></ThingText>
                        <hr/>
                    </div>
                </div>
                <PrettyObj {...this.state.item}></PrettyObj>
            </div>
        );
    }
}

export default Item;
