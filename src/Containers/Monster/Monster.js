import React, {Component} from 'react'
import ThingText from '../../Components/ThingText'
import TraitText from '../../Components/TraitText'
import ActionText from '../../Components/ActionText'
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

        let monsterStats = Object.keys(this.state.monster).map(
            key => {
                if (key !== 'name' && key != 'trait' && key != 'action' && key != 'legendary')
                    return <div key={key}><strong className='capitalize'>{key}:</strong> {this.state.monster[key]}</div>
            }
        )
        
        return (
            <div>
                <div className='container'>
                    <div className="Monsters">
                        <h1>{this.state.monster.name}</h1>
                        <hr/>
                        {monsterStats}
                        <hr/>
                        <TraitText trait={this.state.monster.trait}></TraitText>
                        <hr/>
                        <ActionText action={this.state.monster.action}></ActionText>
                        <ActionText action={this.state.monster.legendary}></ActionText>
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
