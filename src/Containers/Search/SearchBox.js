import React, {Component} from 'react'
import _ from 'lodash'
import Compendium from '../../Helpers/Compendium'
import SearchResult from './SearchResult'
import './SearchBox.css'

class SearchBox extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            isDeepSearch: false,
            results: {
                Item: [],
                Spell: [],
                Race: [],
                Class: [],
                Feat: [],
                Background: [],
                Monster: []
            }
        }
    }

    findResults = _.debounce(() => {
        var results = Compendium.Search(this.state.search, this.state.isDeepSearch);
        console.log('finding results...', results);

        this.setState({results: results});
    }, 500);

    //only re-render if there are results to show!
    shouldComponentUpdate(nextProps, nextState) {
        //console.log('shouldComponentUpdate', nextProps, nextState)
        // if (this.state.results != nextState.results)     return true; else     return
        // false;
        return true;
    }

    //this is needed otherwise the search txtbox is readonly
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox'
            ? target.checked
            : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            if (this.state.search && this.state.search.length > 1) {
                this.findResults()
            } else {
                {}
            }
        });

    }

    render() {
        return (
            <form className='search-box'>
                <label className='checkbox'>
                    <input
                        name='isDeepSearch'
                        type='checkbox'
                        checked={this.state.isDeepSearch}
                        onChange={this.handleInputChange}/>
                    Deep Search
                </label>
                <input
                    className='form-control txt-search'
                    placeholder="Search for..."
                    name="search"
                    value={this.state.search}
                    onChange={this.handleInputChange}/>

                <div className='search-results-summary'>
                    <span>
                        {this.state.results.Item.length}
                    </span>
                    <strong>
                        items
                    </strong>
                    <span>
                        {this.state.results.Spell.length}
                    </span>
                    <strong>
                        Spells,
                    </strong>
                    <span>
                        {this.state.results.Race.length}
                    </span>
                    <strong>
                        Races,
                    </strong>
                    <span>
                        {this.state.results.Class.length}
                    </span>
                    <strong>
                        Classes,
                    </strong>
                    <span>
                        {this.state.results.Feat.length}
                    </span>
                    <strong>
                        Feats,
                    </strong>
                    <span>
                        {this.state.results.Background.length}
                    </span>
                    <strong>
                        Backgrounds,
                    </strong>
                    <span>
                        {this.state.results.Monster.length}
                    </span>
                    <strong>
                        Monsters
                    </strong>

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