import React, { Component } from "react";
import ThingText from "../../Components/ThingText";
import ModifierText from "../../Components/ModifierText";
import PrettyObj from "../../Components/PrettyObj";
import Compendium from "../../Helpers/Compendium";

import './Item.Details.css';

class ItemDetails extends Component {
    constructor(props) {
        super();
        this.state = {
            item: {}
        };
    }

    getItem(name) {
        Compendium.Items.forEach(anItem => {
            if (anItem.name === name) {
                this.setState({ item: anItem });
            }
        });
    }

    componentWillMount() {
        this.getItem(this.props.match.params.name);
    }

    componentWillReceiveProps(props) {
        this.getItem(props.match.params.name);
    }

    render() {
        let itemStats = Object.keys(this.state.item).map(key => {
            if (key !== "name" && key !== "text" && key !== "modifier")
                return (
                    <p key={key}>
                        <strong className="capitalize">{key}:</strong>
                        {this.state.item[key]}
                    </p>
                );
            else return null;
        });

        return (
            <div>
                <div className="container">
                    <div className="item-details">
                        <h1>{this.state.item.name}</h1>
                        <hr /> {itemStats}
                        <ModifierText modifier={this.state.item.modifier} />
                        <hr />
                        <ThingText text={this.state.item.text} />
                        <hr />
                    </div>
                </div>
                <PrettyObj {...this.state.item} />
            </div>
        );
    }
}

export default ItemDetails;
