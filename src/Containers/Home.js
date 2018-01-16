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
                <hr/>
                <div className='row'>
                    <div className='col-md-3'>
                        {Compendium
                            .Classes
                            .map((thing, id) => {
                                return (
                                    <div key={id}>
                                        <Link
                                            to={{
                                            pathname: '/Class/' + thing.name
                                        }}>{thing.name}</Link>
                                    </div>
                                )
                            })}
                    </div>
                    <div className='col-md-3'>
                        {Compendium
                            .Items
                            .map((thing, id) => {
                                return (
                                    <div key={id}>
                                        <Link
                                            to={{
                                            pathname: '/Item/' + thing.name
                                        }}>{thing.name}</Link>
                                    </div>
                                )
                            })}
                    </div>
                    <div className='col-md-3'>
                        {Compendium
                            .Backgrounds
                            .map((thing, id) => {
                                return (
                                    <div key={id}>
                                        <Link
                                            to={{
                                            pathname: '/Background/' + thing.name
                                        }}>{thing.name}</Link>
                                    </div>
                                )
                            })}
                    </div>
                    <div className='col-md-3'>
                        {Compendium
                            .Spells
                            .map((thing, id) => {
                                return (
                                    <div key={id}>
                                        <Link
                                            to={{
                                            pathname: '/Spell/' + thing.name
                                        }}>{thing.name}</Link>
                                    </div>
                                )
                            })}
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;
