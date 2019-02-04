import React, { Component } from 'react';
import './App.css';
import BusCard from './BusCard.js';
import LoadingGif from './loading.gif';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            Buses: []
        }
    }
    componentDidMount() {
        fetch('https://api.wpushuttle.com/bus')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        Buses: result,
                        isLoaded: true
                    });
                }
            );
        this.timer = setInterval(()=> this.refresh(), 5000)

    }

    async refresh(){
        fetch('https://api.wpushuttle.com/bus')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        Buses: result
                    });
                }
            )
    }


    render() {
            return (
                <div className="App animated fadeIn">
                    {this.state.isLoaded? <ShuttleTracker Buses = {this.state.Buses}/>:<Loading/>}
                </div>
            );

    }
}

class ShuttleTracker extends Component{
    render(){
        return(
            <div className="App animated fadeIn">
                <Header/>
                <BusCard Buses = {this.props.Buses} />
                <Footer/>
            </div>
        )
    }
}

class Header extends Component {
   render() {
      return (
         <div class="header container">
             <br></br>
             <i className="fas fa-bus animated zoomIn"></i><br></br>
             <a> Where's the Shuttle?</a><br></br>
             <a id='moto'> a shuttle bus location tracker for WPUNJ students</a>
             {/* <img src={logo} className="App-logo" alt="logo" />*/}

         </div>
      );
   }
}
class Footer extends Component {
   render() {
      return (

             <div class="container ">
                 <div class="footer">
                     <p>Where's the Shuttle is a web application that allows William Paterson
                         University students
                         view the location of all four campus shuttle buses.
                         The current location of all shuttle buses are based on bus schedule, and not on real-time
                         location data.</p>
                     <p><a href="http://rodantnyreyes.com/">Copyright © 2018 Rodantny J. Reyes</a></p>
                     <a id="FooterButton" href="https://www.wpunj.edu/directories/assets/Bus%20Schedules_8_16_18HR.pdf">Full Shuttle Schedule</a>

                 </div>
             </div>


      );
   }
}

class Loading extends Component {
    render() {
        return (

            <div >

                <img className="loadingImg" alt='Dashed Note' src={LoadingGif}></img>
            </div>


        );
    }
}

export default App;
