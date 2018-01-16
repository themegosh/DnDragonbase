import React, {Component} from 'react';
import PrettyObj from './../Components/PrettyObj';
import Compendium from '../Helpers/Compendium';

class Setup extends Component {
    constructor() {
        super();
        this.state = {
            txtSourceUrl: 'CorePlusUnearthedArcana.xml',
            isCompendiumSet: false
        };
    }

    handleSetSource = (event) => {
        console.log('setSource');

        Compendium
            .SetSource(this.state.txtSourceUrl)
            .then(results => {
                console.log('callback from service');

                this.setState({isCompendiumSet: true});
            });
        event.preventDefault();
    }

    handleUrlChange = (event) => {
        console.log('handleUrlChange');
        this.setState({txtSourceUrl: event.target.value});
    }

    btnResetAll = (event) => {
        console.log('resetting all storage');
        Compendium.ResetStorage();
        this.setState({isCompendiumSet: false});
        event.preventDefault();
    }

    render() {
        return (
            <div className="Setup container">

                {/*<PrettyObj {...Compendium.Classes}></PrettyObj>*/}

                <form onSubmit={this.handleSetSource}>
                    <div className='form-group'>
                        <label>
                            Name:
                        </label>
                        <input
                            type="text"
                            value={this.state.txtSourceUrl}
                            onChange={this.handleUrlChange}
                            className='form-control'/>
                    </div>

                    <input type="submit" value="Submit" className='btn btn-success'/>
                    <button onClick={this.btnResetAll} className='btn btn-warning'>Reset All</button>
                </form>

                <div className='alert alert-info inline-block'>
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
            </div>
        );
    }
}

export default Setup;
