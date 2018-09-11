import {Component} from "react";
import React from "react";
import './BusCard.css';

class BusCard extends Component {
    render() {
        return (
            <div  class="container" >

                {/*{this.state.Bus_Location.map(location => (
                    <div className="CardContainer">
                        {location.location_id == 2? location.location_name :''}
                    </div>
                ))}*/}


                {this.props.Buses.map((Bus) => (
                    <div class="CardContainer">

                        <div  class=" col col-lg-6">
                            <div class="BusName uppercase CardBigText"><a>{Bus.bus_name}</a></div>
                        <div class={"BusInformationCard shadow-lg " + (Bus.IsRunning? 'isRunning' : 'isRunning')} >

                            {Bus.IsRunning? <BusIsRunning Bus={Bus} /> :<BusIsRunning Bus={Bus}/>}
                        </div><br></br></div></div>

                ))}
            </div>
        );
    }
}

class BusIsRunning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            current_stop: []
        }
    }

    componentDidMount() {
        fetch('http://api.wpushuttle.com/currentstop')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        current_stop: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, current_stop} = this.state;
            return (

            <div class="row">
                <div class="countdown">



                    <div className="minute">01</div>
                    <div className="minute_text">MINUTES</div>
                </div>
                <div class="BusDetails">
                    {this.props.Bus.bus_Name} {this.props.key}

                    {/*<TestCard current_stop = {current_stop} Bus={this.props.Bus} />*/}

                    {current_stop.map(current_stop => (
                        <div>

                            {this.props.Bus.bus_id == current_stop.bus? <PrintBusLocation  current_stop = {current_stop} />: ''}
                        </div>

                    ))}


                    {/*
                    <i className="fas fa-arrow-circle-right blinking"></i>
                        <b> The University Commons / Lot 5</b> <br></br>
                    <a id="NextStop"> Ben Shahn/Garage</a>
                    */}
                </div>



            </div>
        );
    }
}


class PrintBusLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            Currentlocation: [],
            Nextlocation: []
        }
    }

    componentDidMount() {
        var CurrentLocationID = this.props.current_stop.location
        var NextLocationID = this.props.current_stop.next_location
        var url = 'http://api.wpushuttle.com/stoplocation/'

        fetch(url + CurrentLocationID)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        Currentlocation: result
                    });
                }
            )

        fetch(url + NextLocationID)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        Nextlocation: result
                    });
                }
            )
    }

    render() {
        const {Currentlocation,Nextlocation} = this.state;
        return (

            <div>
                <i className="fas fa-arrow-circle-right blinking"></i> <b>{Currentlocation.location_name}</b><br></br>
                {Nextlocation.location_name}

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