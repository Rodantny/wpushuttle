import {Component} from "react";
import React from "react";
import './BusCard.css';

class BusCard extends Component {
    render() {
        return (
            <div  className="container" >
                {this.props.Buses.map((Bus,i) => (
                    <div class="CardContainer ">

                        <div  class=" col col-lg-6">
                            <div class="BusName uppercase CardBigText"><a>{Bus.bus_name}</a></div>
                        <div class={"BusInformationCard shadow-lg " + (Bus.IsRunning? 'isRunning' : 'isNotRunning')} >

                            {Bus.IsRunning? <BusIsRunning Bus={Bus} key={i}/>:<BusNotRunning Bus={Bus} key={i}/>}
                        </div><br></br></div>
                    </div>

                ))}
            </div>
        );
    }
}

class BusIsRunning extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_stop: [],
        }
    }

    componentDidMount() {
        this.fetch_state();
        this.timer = setInterval(()=> this.refresh(), 5000)

    }

    fetch_state(){
        fetch('https://api.wpushuttle.com/currentstop')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        current_stop: result,
                    });
                }

            )
    }

    async refresh(){
        this.fetch_state();
    }

    render() {
            return (
                <div>

                            {this.state.current_stop.map((current_stop, i) => (
                                <div >
                                    {this.props.Bus.bus_id === current_stop.bus ?
                                        (current_stop.waiting ?
                                                <BusisWaiting current_stop={current_stop} key={i} Bus={this.props.Bus}/>
                                                : <BusNotWaiting current_stop={current_stop} key={i} Bus={this.props.Bus}/>
                                        )
                                        : ''
                                    }
                                </div>
                            ))}


                </div>
        );
    }
}

class BusisWaiting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Currentlocation: [],
            Nextlocation: [],
        }
    }


    componentDidMount() {
        this.fetch_state();
        this.timer = setInterval(()=> this.refresh(), 5000);
    }

    fetch_state(){
        let CurrentLocationID = this.props.current_stop.location;
        let NextLocationID = this.props.current_stop.next_location;
        let url = 'https://api.wpushuttle.com/stoplocation/';

        fetch(url + CurrentLocationID)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        Currentlocation: result
                    });
                }
            )

        fetch(url + NextLocationID)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        Nextlocation: result
                    });
                }
            )
    }
    async refresh(){
        this.fetch_state();
    }


    render() {
        const {Currentlocation,Nextlocation, } = this.state;

        return (
        <div className="row">
            <div className="countdown">


                <div className="minute">
                    0
                </div>
                <div className="minute_text">MINUTES<br></br>AWAY</div>
            </div>

            <div className="BusDetails">
                <i className="fas fa-flag"></i><b> {Currentlocation.location_name}</b><br></br>
                {Nextlocation.location_name}
            </div>
        </div>

        );
    }
}

class BusNotWaiting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Nextlocation: [],
            NextNextlocation: [],
        }
    }

    componentDidMount() {
        this.fetch_state();
        this.timer = setInterval(()=> this.refresh(), 5000);
    }

    fetch_state(){
        var NextLocationID = this.props.current_stop.next_location
        var NextNextLocationID = this.props.current_stop.next_next_location
        var url = 'https://api.wpushuttle.com/stoplocation/'

        fetch(url + NextLocationID)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        Nextlocation: result
                    });
                }
            )

        fetch(url + NextNextLocationID)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        NextNextlocation: result
                    });
                }
            )

    }

    async refresh(){
        this.fetch_state();
    }

    render() {
        const {Nextlocation,NextNextlocation } = this.state;

        return (
            <div className="row">
                    <div className="countdown">


                        <div className="minute">
                            {this.props.current_stop.next_location_eta}
                        </div>
                        <div className="minute_text">{this.props.current_stop.next_location_eta <= 1? 'MINUTE': 'MINUTES'}<br></br>AWAY</div>
                    </div>
                <div className="BusDetails">
                    <i className="fas fa-arrow-circle-right blinking"></i>  <b>{Nextlocation.location_name}</b><br></br>
                    {NextNextlocation.location_name}
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