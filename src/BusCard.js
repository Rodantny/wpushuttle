import {Component} from "react";
import React from "react";
import './BusCard.css';

class BusCard extends Component {
    render() {
        return (
            <div  class="container" >
                {this.props.items.map(item => (
                    <div class="card bus" >
                        {item.bus_name}<br></br>
                        <b> {item.my_field = 0? 'The Shuttle is at ' +
                            (item.bus_id) : 'This shuttle is not running'}</b>

                    </div>
                ))}
            </div>
        );
    }
}

export default BusCard;