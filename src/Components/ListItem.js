import React, {Component} from 'react';

class ListItem extends Component {
    render(props) {
        //console.log(this.props);

        return (
            <div className="ListItem">
                {this.props.item.name}
            </div>
        );
    }
}

export default ListItem;
