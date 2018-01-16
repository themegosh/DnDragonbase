import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class SearchResult extends Component {

    render() {
        return (
            <div className='search-result'>
                <Link
                    to={{
                    pathname: '/' + this.props.type + '/' + this.props.name
                }}>{this.props.name}</Link>
            </div>
        )
    }
}

export default SearchResult