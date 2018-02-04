import React, { Component } from "react";
import { Link } from "react-router-dom";

import Compendium from "../../Helpers/Compendium";

import "./Home.css";

class Home extends Component {
    render() {
        return (
            <div className="home container text-center">
                <div>
                    <div>Spells: {Compendium.Spells.length}</div>
                    <div>Classes: {Compendium.Classes.length}</div>
                    <div>Items: {Compendium.Items.length}</div>
                    <div>Backgrounds: {Compendium.Backgrounds.length}</div>
                    <div>Feats: {Compendium.Feats.length}</div>
                    <div>Races: {Compendium.Races.length}</div>
                    <div>Monsters: {Compendium.Monsters.length}</div>
                </div>
            </div>
        );
    }
}

export default Home;
