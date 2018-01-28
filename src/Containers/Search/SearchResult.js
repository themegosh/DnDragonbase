import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchResult extends Component {
    render() {
        return (
            <div
                className="search-result"
                onClick={this.props.handleResultSelect}
            >
                <Link
                    to={{
                        pathname: "/" + this.props.type + "/" + this.props.name
                    }}
                >
                    <span>{this.props.name}</span>
                    <span className="pull-right">{this.props.type}</span>
                </Link>
            </div>
        );
    }
}

export default SearchResult;
