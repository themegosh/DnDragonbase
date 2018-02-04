import React, { Component } from "react";
import _ from "lodash";
import Compendium from "../../Helpers/Compendium";
import SearchResult from "./SearchResult";
import "./SearchBox.css";

class SearchBox extends Component {
    constructor() {
        super();
        this.state = {
            search: "",
            isDeepSearch: false,
            showResults: false,
            results: {
                Item: [],
                Spell: [],
                Race: [],
                Class: [],
                Feat: [],
                Background: [],
                Monster: []
            }
        };
    }

    findResults = _.debounce(() => {
        let results = Compendium.Search(this.state.search, this.state.isDeepSearch);
        console.log("finding results...", results);

        this.setState({ results: results });
    }, 500);

    //only re-render if there are results to show!
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdate', nextProps, nextState) if
        // (this.state.results != nextState.results)     return true; else     return
        // false;
        return true;
    }

    //this is needed otherwise the search txtbox is readonly
    handleInputChange = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {
                [name]: value
            },
            () => {
                if (this.state.search && this.state.search.length > 1) {
                    this.findResults();
                }
            }
        );
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    setWrapperRef = node => {
        this.wrapperRef = node;
    };

    handleClickOutside = event => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ showResults: false });
        }
    };

    handleFocus = () => {
        this.setState({ showResults: true });
    };

    handleResultSelect = () => {
        this.setState({ showResults: false });
    };

    getSearchResults() {
        if (
            !this.state.showResults ||
            (!this.state.results.Item.length &&
                !this.state.results.Spell.length &&
                !this.state.results.Race.length &&
                !this.state.results.Class.length &&
                !this.state.results.Feat.length &&
                !this.state.results.Background.length &&
                !this.state.results.Monster.length)
        ) {
            return null;
        }

        return (
            <div className="search-results">
                <div className="search-results-summary">
                    <span>{this.state.results.Item.length}</span>
                    <strong>items</strong>
                    <span>{this.state.results.Spell.length}</span>
                    <strong>Spells,</strong>
                    <span>{this.state.results.Race.length}</span>
                    <strong>Races,</strong>
                    <span>{this.state.results.Class.length}</span>
                    <strong>Classes,</strong>
                    <span>{this.state.results.Feat.length}</span>
                    <strong>Feats,</strong>
                    <span>{this.state.results.Background.length}</span>
                    <strong>Backgrounds,</strong> <span>{this.state.results.Monster.length}</span>
                    <strong>Monsters</strong>
                </div>
                <div className="clearfix">
                    {Object.keys(this.state.results).map(key => {
                        return this.state.results[key].map((anItem, id) => {
                            return (
                                <SearchResult
                                    key={id}
                                    name={anItem.name}
                                    type={key}
                                    handleResultSelect={this.handleResultSelect}
                                />
                            );
                        });
                    })}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <form
                    className="search-box"
                    autoComplete="off"
                    ref={this.setWrapperRef}
                    onSubmit={this.handleInputChange}>
                    <label className="checkbox">
                        <input
                            name="isDeepSearch"
                            type="checkbox"
                            checked={this.state.isDeepSearch}
                            onChange={this.handleInputChange}
                            onFocus={this.handleFocus}
                        />
                        Deep Search
                    </label>
                    <input
                        className="form-control txt-search"
                        placeholder="Search everything..."
                        name="search"
                        value={this.state.search}
                        onChange={this.handleInputChange}
                        onFocus={this.handleFocus}
                    />{" "}
                    {this.getSearchResults()}
                </form>
            </div>
        );
    }
}

export default SearchBox;
