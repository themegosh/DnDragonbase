import React, { Component } from "react";
import ThingText from "../../Components/ThingText";
import ModifierText from "../../Components/ModifierText";
import PrettyObj from "../../Components/PrettyObj";
import Compendium from "../../Helpers/Compendium";

class Feat extends Component {
    constructor(props) {
        super();
        this.state = {
            feat: {}
        };
    }

    getFeat(name) {
        Compendium.Feats.forEach(aFeat => {
            if (aFeat.name === name) {
                this.setState({ feat: aFeat });
            }
        });
    }

    componentWillMount() {
        this.getFeat(this.props.match.params.name);
    }

    componentWillReceiveProps(props) {
        this.getFeat(props.match.params.name);
    }

    render() {
        let featStats = Object.keys(this.state.feat).map(key => {
            if (key !== "name" && key !== "text" && key !== "modifier")
                return (
                    <div key={key}>
                        <strong className="capitalize">{key}:</strong>
                        {this.state.feat[key]}
                    </div>
                );
            else return null;
        });

        return (
            <div>
                <div className="container">
                    <div className="feat">
                        <h1>{this.state.feat.name}</h1>
                        <hr /> {featStats}
                        <hr />
                        <ThingText text={this.state.feat.text} />
                        <hr />
                        <ModifierText modifier={this.state.feat.modifier} />
                        <hr />
                    </div>
                </div>
                <PrettyObj {...this.state.feat} />
            </div>
        );
    }
}

export default Feat;
