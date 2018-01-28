import React, { Component } from "react";
import ThingText from "../../Components/ThingText";
import TraitText from "../../Components/TraitText";
import ActionText from "../../Components/ActionText";
import PrettyObj from "../../Components/PrettyObj";
import Compendium from "../../Helpers/Compendium";

class Monster extends Component {
    constructor(props) {
        super();
        this.state = {
            monster: {}
        };
    }

    getMonster(name) {
        Compendium.Monsters.forEach(aMonster => {
            if (aMonster.name === name) {
                this.setState({ monster: aMonster });
            }
        });
    }

    componentWillMount() {
        this.getMonster(this.props.match.params.name);
    }

    componentWillReceiveProps(props) {
        this.getMonster(props.match.params.name);
    }

    render() {
        let monsterStats = Object.keys(this.state.monster).map(key => {
            if (
                key !== "name" &&
                key !== "trait" &&
                key !== "action" &&
                key !== "legendary"
            )
                return (
                    <div key={key}>
                        <strong className="capitalize">{key}:</strong>
                        {this.state.monster[key]}
                    </div>
                );
            else return null;
        });

        return (
            <div>
                <div className="container">
                    <div className="Monsters">
                        <h1>{this.state.monster.name}</h1>
                        <hr /> {monsterStats}
                        <hr />
                        <TraitText trait={this.state.monster.trait} />
                        <hr />
                        <ActionText action={this.state.monster.action} />
                        <ActionText action={this.state.monster.legendary} />
                        <hr />
                        <ThingText text={this.state.monster.text} />
                        <hr />
                    </div>
                </div>
                <PrettyObj {...this.state.monster} />
            </div>
        );
    }
}

export default Monster;
