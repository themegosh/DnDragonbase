import React, {Component} from 'react'
import PrettyObj from '../../Components/PrettyObj'
import Compendium from '../../Helpers/Compendium'

class Spell extends Component {
    constructor(props){
        super();
        this.state = {
            spell: {},
            found: false
        }

        Compendium.Spells.forEach(aSpell => {
            if (aSpell.name === props.match.params.name){
                this.state.spell = aSpell;
                this.state.found = true;
            }
        })

    }

    render() {

        return ( 
            <div className="Spell">
                <h1>{this.state.spell.name}</h1>
                <PrettyObj {...this.state.spell}></PrettyObj>
            </div>
        );
    }
}

export default Spell;
