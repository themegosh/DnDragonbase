import React, {Component} from 'react'
import Compendium from '../../Helpers/Compendium'
import PrettyObj from '../../Components/PrettyObj'
import ThingText from '../../Components/ThingText'

class Background extends Component {
    constructor(props){
        super();
        this.state = {
            background: {},
            found: false
        }

        Compendium.Backgrounds.forEach(aBackground => {
            if (aBackground.name === props.match.params.name){
                this.state.background = aBackground;
                this.state.found = true;
            }
        })

    }

    render() {
        
        let traitText = null;
        if (Array.isArray(this.state.background.trait)){
            traitText = this.state.background.trait.map(aTrait => {
                return <div>
                        <h4>{aTrait.name}:</h4>
                        <ThingText text={aTrait.text}></ThingText>
                    </div>
            })
        }

        return ( 
            <div className='container'>
                <div className="Background">
                    <h1>{this.state.background.name}</h1>
                    {traitText}
                    <PrettyObj {...this.state.background}></PrettyObj>
                </div>
            </div>
        );
    }
}

export default Background;
