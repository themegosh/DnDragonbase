import React, {Component} from 'react'
import ThingText from '../../Components/ThingText'
import PrettyObj from '../../Components/PrettyObj'
import Compendium from '../../Helpers/Compendium'

class Item extends Component {
    constructor(props) {
        super();
        this.state = {
            item: {},
            found: false
        }

        Compendium
            .Items
            .forEach(anItem => {
                if (anItem.name === props.match.params.name) {
                    this.state.item = anItem;
                    this.state.found = true;
                }
            })
    }

    render() {

        var itemStats = Object.keys(this.state.item).map(
            key => {
                if (key !== 'text')
                    return <div key={key}><strong className='thing-summary-name'>{key}:</strong> {this.state.item[key]}</div>
            }
        )

        return (
            <div>
                <div className='container'>
                    <div className="Item">
                        <h1>{this.state.item.name}</h1>
                        <hr/>
                        {itemStats}
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
