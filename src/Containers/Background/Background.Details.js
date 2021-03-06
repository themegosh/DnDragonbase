import React, { Component } from "react";
import Compendium from "../../Helpers/Compendium";
import PrettyObj from "../../Components/PrettyObj";
import TraitText from "../../Components/TraitText";

import './Background.Details.css';

class BackgroundDetails extends Component {
    constructor(props) {
        super();
        this.state = {
            background: {}
        };
    }

    getBackground(name) {
        Compendium.Backgrounds.forEach(aBackground => {
            if (aBackground.name === name) {
                this.setState({ background: aBackground });
            }
        });
    }

    componentWillMount() {
        this.getBackground(this.props.match.params.name);
    }

    componentWillReceiveProps(props) {
        this.getBackground(props.match.params.name);
    }

    render() {
        let backgroundInfo = Object.keys(this.state.background).map(key => {
            if (key !== "name" && key !== "text" && key !== "trait")
                return (
                    <div key={key}>
                        <strong className="capitalize">{key}:</strong>
                        {this.state.background[key]}
                    </div>
                );
            else return null;
        });

        return (
            <div className="container">
                <div className="Background-details">
                    <h1>{this.state.background.name}</h1>
                    {backgroundInfo}
                    <TraitText trait={this.state.background.trait} />
                    <PrettyObj {...this.state.background} />
                </div>
            </div>
        );
    }
}

export default BackgroundDetails;
