import React, {Component} from 'react'
import Compendium from '../../Helpers/Compendium'
import _ from 'lodash'
import {Link} from 'react-router-dom'

class SearchBox extends Component {
    state = {
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
            } else if (!this.state.query) {}
        })
    }

    render() {
        return (
            <form>
                <input
                    className='form-control'
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}/>

                <div>Results: {this.state.results.Item.length}
                    items, {this.state.results.Spell.length}
                    Spells, {this.state.results.Race.length}
                    Races, {this.state.results.Classe.length}
                    Classes, {this.state.results.Feat.length}
                    Feats, {this.state.results.Background.length}
                    Backgrounds, {this.state.results.Monster.length}
                    Monsters</div>

                <div className='clearfix'>
                    {Object
                        .keys(this.state.results)
                        .map((key) => {
                            return this
                                .state
                                .results[key]
                                .map((anItem, id) => {
                                    return (
                                        <Link
                                            key={id}
                                            className='col-sm-2'
                                            to={{
                                            pathname: '/' + key + '/' + anItem.name
                                        }}>{anItem.name}</Link>
                                    )
                                })

                        })}
                </div>
            </form>
        )
    }
}

export default SearchBox