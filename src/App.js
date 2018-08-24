import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusCard from './BusCard.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        fetch('http://api.wpushuttle.com/bus')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
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
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: </div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">
                    <Header/>
                    <BusCard items = {items} />

                    <div>

                        <Footer/>
                    </div>
                </div>
            );
        }
    }
}

class Header extends Component {
   render() {
      return (
         <div>
             <img src={logo} className="App-logo" alt="logo" />
         </div>
      );
   }
}



class Footer extends Component {
   render() {
      return (
         <div>
             <div className="container">
                 <p><b><a href="https://www.wpunj.edu/commuter/shuttlemap.pdf">Full Shuttle Schedule</a></b></p>

             <hr className="star-light"></hr>

                     <p><b>Where's the Shuttle</b> is a web application that allows <b>William Paterson
                         University</b> students
                         view the location of all four campus shuttle buses.
                         The current location of all shuttle buses are based on bus schedule, and not on real-time
                         location data.</p>
                     <p>Copyright © 2018 Rodantny J. Reyes</p>
             </div>
         </div>
      );
   }
}

export default App;
