import React, {Component} from 'react';
import ListItem from './ListItem';

class ListItems extends Component {
    render(props) {
        console.log(this.props);

        const listItems = this.props.items.map((item, i) => 
            <ListItem item={item} key={i}></ListItem>
        );


        return (
            <div className="ListItems">
                {listItems} 
            </div>
        );
    }
}

export default ListItems;
