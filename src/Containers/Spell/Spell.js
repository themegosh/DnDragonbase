import React, {Component} from 'react'
import PrettyObj from '../../Components/PrettyObj'
import ThingText from '../../Components/ThingText'
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

        let spellStats = Object.keys(this.state.spell).map(
            key => {
                if (key !== 'text')
                    return <div key={key}><strong className='thing-summary-name'>{key}:</strong> {this.state.spell[key]}</div>
            }
        )

        return ( 
            <div className='container'>
                <div className="Spell">
                    <h1>{this.state.spell.name}</h1>
                    <hr/>
                    {spellStats}
                    <hr/>
                    <ThingText text={this.state.spell.text}></ThingText>
                </div>
                <PrettyObj {...this.state.spell}></PrettyObj>
            </div>
        );
    }
}

export default Spell;
