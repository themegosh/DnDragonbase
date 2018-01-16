import React, {Component} from 'react'
import _ from 'lodash'
import Compendium from '../../Helpers/Compendium'
import SearchResult from './SearchResult'
import './SearchBox.css'

class SearchBox extends Component {
    constructor() {
        super()
        this.state = {
            query: '',
            results: {
                Item: [],
                Spell: [],
                Race: [],
                Classe: [],
                Feat: [],
                Background: [],
                Monster: []
            }
        }
    }

    findResults = _.debounce(() => {
        var results = Compendium.Search(this.state.query);
        console.log('finding results...', results);

        this.setState({results: results});
    }, 500);

    //only re-render if there are results to show!
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.results != nextState.results) 
            return true;
        else 
            return false;
        }
    
    //this is needed otherwise the search txtbox is readonly
    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.findResults()
            } else {
                {}
            }
        })
    }

    render() {
        return (
            <form className='search-box'>
                <input
                    className='form-control'
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}/>

                <div className='search-results'>
                    <span>
                        Results:
                    </span>
                    <span>
                        {this.state.results.Item.length}
                        items
                    </span>
                    <span>
                        {this.state.results.Spell.length}
                        Spells,
                    </span>
                    <span>
                        {this.state.results.Race.length}
                        Races,
                    </span>
                    <span>
                        {this.state.results.Classe.length}
                        Classes,
                    </span>
                    <span>
                        {this.state.results.Feat.length}
                        Feats,
                    </span>
                    <span>
                        {this.state.results.Background.length}
                        Backgrounds,
                    </span>
                    <span>
                        {this.state.results.Monster.length}
                        Monsters</span>

                </div>
                <div className='clearfix'>
                    {Object
                        .keys(this.state.results)
                        .map((key) => {
                            return this
                                .state
                                .results[key]
                                .map((anItem, id) => {
                                    return (
                                        <SearchResult key={id} name={anItem.name} type={key}></SearchResult>
                                    )
                                })

                        })}
                </div>
            </form>
        )
    }
}

export default SearchBox