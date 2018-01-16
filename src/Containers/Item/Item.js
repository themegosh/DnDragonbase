import React, {Component} from 'react'
import ThingText from '../../Components/ThingText'
import PrettyObj from '../../Components/PrettyObj'
import Compendium from '../../Helpers/Compendium'


class Item extends Component {
    constructor(props){
        super();
        this.state = {
            item: {},
            found: false
        }

        Compendium.Items.forEach(anItem => {
            if (anItem.name === props.match.params.name){
                this.state.item = anItem;
                this.state.found = true;
            }
        })

    }

    render() {

        return ( 
            <div className="Item">
                <h1>{this.state.item.name}</h1>
                <ThingText {...this.state.item.text}></ThingText>
                <hr/>
                <PrettyObj {...this.state.item}></PrettyObj>
            </div>
        );
    }
}

export default Item;
