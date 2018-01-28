import React, { Component } from "react";
import Compendium from "../Helpers/Compendium";

class Home extends Component {
    render() {
        return (
            <div className="Home container text-center">
                <hr />
                <div>Spells: {Compendium.Spells.length}</div>
                <div>Classes: {Compendium.Classes.length}</div>
                <div>Items: {Compendium.Items.length}</div>
                <div>Backgrounds: {Compendium.Backgrounds.length}</div>
                <div>Feats: {Compendium.Feats.length}</div>
                <div>Races: {Compendium.Races.length}</div>
                <div>Monsters: {Compendium.Monsters.length}</div>
            </div>
        );
    }
}

export default Home;
