import {Component} from "react";
import React from "react";
import './BusCard.css';

class BusCard extends Component {
    render() {
        return (
            <div  class="container" >
                {this.props.items.map(item => (
                    <div class="CardContainer">
                        <div  class=" col col-lg-6">
                        <h1 class="BusName uppercase CardBigText">{item.bus_name}</h1>
                        <div class={"card Bus shadow-lg " + (item.my_field? 'isRunning' : 'isNotRunning')} >
                            <br></br>
                            {item.my_field? <BusIsRunning item={item}/> :<BusNotRunning/>}
                        </div></div></div>

                ))}
            </div>
        );
    }
}

class BusIsRunning extends Component {
    render() {
        return (

            <div class="row">
                <div className="col col-lg-2">
                    <div className="minute">25</div>
                    <div className="minute_text">MINUTES</div>
                </div>
                <div className=" col col-lg-10">
                    <i className="fas fa-arrow-circle-right"></i>  <b>The University Commons / Lot 5</b><br></br>
                    Ben Shahn/Garage<br></br>
                    {/* THIS IS A COMMENT {this.props.item.bus_name}*/}
                </div>



            </div>
        );
    }
}

class BusNotRunning extends Component {
    render() {
        return (

                <div className="row">
                    <div className=" col col-lg-10">
                        Sorry! This Shuttle is not running at this time.
                    </div>

                    <div className=" col col-lg-2">
                        <div className="minute">XX</div>
                        <div className="minute_text">MINUTES</div>
                    </div>

                </div>

        );
    }
}


export default BusCard;