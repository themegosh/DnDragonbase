import React, {Component} from 'react'
import PrettyObj from '../../Components/PrettyObj'
import Compendium from '../../Helpers/Compendium'

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

        return ( 
            <div className="Background">
                <h1>{this.state.background.name}</h1>
                <PrettyObj {...this.state.background}></PrettyObj>
            </div>
        );
    }
}

export default Background;
