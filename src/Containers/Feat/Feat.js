import React, {Component} from 'react'
import ThingText from '../../Components/ThingText'
import ModifierText from '../../Components/ModifierText'
import PrettyObj from '../../Components/PrettyObj'
import Compendium from '../../Helpers/Compendium'

class Feat extends Component {
    constructor(props) {
        super();
        this.state = {
            feat: {},
            found: false
        }

        Compendium
            .Feats
            .forEach(aFeat => {
                if (aFeat.name === props.match.params.name) {
                    this.state.feat = aFeat;
                    this.state.found = true;
                }
            })
    }

    render() {

        let itemStats = Object.keys(this.state.feat).map(
            key => {
                if (key !== 'text' && key !== 'modifier')
                    return <div key={key}><strong className='thing-summary-name'>{key}:</strong> {this.state.feat[key]}</div>
            }
        )

        return (
            <div>
                <div className='container'>
                    <div className="feat">
                        <h1>{this.state.feat.name}</h1>
                        <hr/>
                        {/*{itemStats}*/}
                        <hr/>
                        <ThingText text={this.state.feat.text}></ThingText>
                        <hr/>
                        <ModifierText modifier={this.state.feat.modifier}></ModifierText>
                        <hr />
                    </div>
                </div>
                <PrettyObj {...this.state.feat}></PrettyObj>
            </div>
        );
    }
}

export default Feat;
