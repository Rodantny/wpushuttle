import {Component} from "react";
import React from "react";
import './BusCard.css';

class BusCard extends Component {
    render() {
        return (
            <div  class="container" >
                {this.props.Buses.map(Bus => (
                    <div class="CardContainer">
                        <div  class=" col col-lg-6">
                            <div class="BusName uppercase CardBigText"><a>{Bus.bus_name}</a></div>
                        <div class={"BusInformationCard shadow-lg " + (Bus.my_field? 'isRunning' : 'isNotRunning')} >

                            {Bus.my_field? <BusIsRunning Bus={Bus}/> :<BusNotRunning/>}
                        </div><br></br></div></div>

                ))}
            </div>
        );
    }
}

class BusIsRunning extends Component {
    render() {
        return (

            <div class="row">
                <div class="countdown">
                    <div className="minute">25</div>
                    <div className="minute_text">MINUTES</div>
                </div>
                <div class="BusDetails">

                    <i className="fas fa-arrow-circle-right"></i>
                        <b> The University Commons / Lot 5</b> <br></br>
                    <a id="NextStop"> Ben Shahn/Garage</a>




                    {/* THIS IS A COMMENT {this.props.Bus.bus_name}*/}
                </div>



            </div>
        );
    }
}

class BusNotRunning extends Component {
    render() {
        return (

                <div className="row">

                    <div className="countdown">
                        <div className="minute">XX</div>
                        <div className="minute_text">MINUTES</div>
                    </div>

                    <div class="BusDetails" >
                        <i className="fas fa-times-circle"></i> Sorry! This Shuttle is not running at this time.
                    </div>


                </div>

        );
    }
}


export default BusCard;