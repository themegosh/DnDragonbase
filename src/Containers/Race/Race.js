import React, {Component} from 'react'
import ThingText from '../../Components/ThingText'
import TraitText from '../../Components/TraitText'
import PrettyObj from '../../Components/PrettyObj'
import Compendium from '../../Helpers/Compendium'

class Race extends Component {
    constructor(props) {
        super();
        this.state = {
            race: {},
            found: false
        }
    }

    getRace(name) {
        Compendium
            .Races
            .forEach(aRace => {
                if (aRace.name === name) {
                    this.setState({race: aRace})
                }
            })
    }

    componentWillMount() {
        this.getRace(this.props.match.params.name)
    }

    componentWillReceiveProps(props) {
        this.getRace(props.match.params.name)
    }

    render() {

        let raceInfo = Object
            .keys(this.state.race)
            .map(key => {
                if (key !== 'name' && key !== 'text' && key !== 'trait') 
                    return (
                        <div key={key}>
                            <strong className='capitalize'>{key}:</strong>
                            {this.state.race[key]}
                        </div>
                    )
                else 
                    return null
            })

        return (
            <div>
                <div className='container'>
                    <div className="race">
                        <h1>{this.state.race.name}</h1>
                        <hr/> {raceInfo}
                        <hr/>
                        <ThingText text={this.state.race.text}></ThingText>
                        <hr/>
                        <TraitText trait={this.state.race.trait}></TraitText>
                    </div>
                </div>
                <PrettyObj {...this.state.race}></PrettyObj>
            </div>
        );
    }
}

export default Race;
