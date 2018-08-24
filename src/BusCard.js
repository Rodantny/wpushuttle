import {Component} from "react";
import React from "react";
import './BusCard.css';

class BusCard extends Component {
    render() {
        return (
            <div  class="container" >
                {this.props.items.map(item => (
                    <div class="CardContainer">
                        <h1 class="BusName uppercase">{item.bus_name}</h1>
                        <div class="card Bus isRunning" >
                            <br></br>
                            {item.my_field = 0? 'The Shuttle is at ' +
                                (item.bus_id) : 'This shuttle is not running'}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default BusCard;