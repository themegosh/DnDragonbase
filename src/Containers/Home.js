import React, {Component} from 'react';
import Compendium from '../Helpers/Compendium';
import SearchBox from './Search/SearchBox';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="Home container">
                <SearchBox></SearchBox>
                <hr/>
                <ul>
                    <li>Spells: {Compendium.Spells.length}</li>
                    <li>Classes: {Compendium.Classes.length}</li>
                    <li>Items: {Compendium.Items.length}</li>
                    <li>Backgrounds: {Compendium.Backgrounds.length}</li>
                    <li>Feats: {Compendium.Feats.length}</li>
                    <li>Races: {Compendium.Races.length}</li>
                    <li>Monsters: {Compendium.Monsters.length}</li>
                </ul>
            </div>
        );
    }
}

export default Home;
