import React, { Component } from "react";
import PrettyObj from "../../Components/PrettyObj";
import ThingText from "../../Components/ThingText";
import Compendium from "../../Helpers/Compendium";

class Spell extends Component {
    constructor(props) {
        super();
        this.state = {
            spell: {}
        };
    }

    getSpell(name) {
        Compendium.Spells.forEach(aSpell => {
            if (aSpell.name === name) {
                this.setState({ spell: aSpell });
            }
        });
    }

    componentWillMount() {
        this.getSpell(this.props.match.params.name);
    }

    componentWillReceiveProps(props) {
        this.getSpell(props.match.params.name);
    }

    render() {
        let spellStats = Object.keys(this.state.spell).map(key => {
            if (key !== "name" && key !== "text")
                return (
                    <div key={key}>
                        <strong className="thing-summary-name">{key}:</strong>
                        {this.state.spell[key]}
                    </div>
                );
            else return null;
        });

        return (
            <div className="container">
                <div className="Spell">
                    <h1>{this.state.spell.name}</h1>
                    <hr /> {spellStats}
                    <hr />
                    <ThingText text={this.state.spell.text} />
                </div>
                <PrettyObj {...this.state.spell} />
            </div>
        );
    }
}

export default Spell;
