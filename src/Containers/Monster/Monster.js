import React, {Component} from 'react'
import ThingText from '../../Components/ThingText'
import PrettyObj from '../../Components/PrettyObj'
import Compendium from '../../Helpers/Compendium'

class Monster extends Component {
    constructor(props) {
        super();
        this.state = {
            monster: {},
            found: false
        }

        Compendium
            .Monsters
            .forEach(aMonster => {
                if (aMonster.name === props.match.params.name) {
                    this.state.monster = aMonster;
                    this.state.found = true;
                }
            })
    }

    render() {

        var monsterStats = Object.keys(this.state.monster).map(
            key => {
                if (key != 'trait' && key != 'action')
                    return <div key={key}><strong className='thing-summary-name'>{key}:</strong> {this.state.monster[key]}</div>
            }
        )

        var traitText = null;
        if (Array.isArray(this.state.monster.trait)){
            traitText = this.state.monster.trait.map(aTrait => {
                return <div>
                        <h4>{aTrait.name}:</h4>
                        <ThingText text={aTrait.text}></ThingText>
                    </div>
            })
        }

        
        var actionText = null;
        if (Array.isArray(this.state.monster.action)){
            actionText = this.state.monster.action.map(anAction => {
                return <div>
                        <h4>{anAction.name}</h4>
                        <ThingText text={anAction.text}></ThingText>
                        <p><em>{anAction.attack}</em></p>
                    </div>
            })
        }

        return (
            <div>
                <div className='container'>
                    <div className="Monsters">
                        <h1>{this.state.monster.name}</h1>
                        <hr/>
                        {monsterStats}
                        <hr/>
                        {traitText}
                        <hr/>
                        {actionText}
                        <hr/>
                        <ThingText text={this.state.monster.text}></ThingText>
                        <hr/>
                    </div>
                </div>
                <PrettyObj {...this.state.monster}></PrettyObj>
            </div>
        );
    }
}

export default Monster;
