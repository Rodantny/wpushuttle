import React, { Component } from 'react';
import logo from './logo.png';
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



                    <header>
                        <Header/>
                    </header>

                    <main class="Site-content">
                        <BusCard items = {items} />
                    </main>


                        <Footer/>

                </div>
            );
        }
    }
}

class Header extends Component {
   render() {
      return (
         <div class="header container">
             <br></br>

             <img src={logo} className="App-logo" alt="logo" />

         </div>
      );
   }
}



class Footer extends Component {
   render() {
      return (

             <div class="container ">
                 <hr className="star-light"></hr>
                 <div class="card footer">
                     <p>Where's the Shuttle is a web application that allows William Paterson
                         University students
                         view the location of all four campus shuttle buses.
                         The current location of all shuttle buses are based on bus schedule, and not on real-time
                         location data.</p>
                     <p>Copyright © 2018 Rodantny J. Reyes</p>
                     <p><b><a href="https://www.wpunj.edu/commuter/shuttlemap.pdf">Full Shuttle Schedule</a></b></p>
                 </div>
             </div>


      );
   }
}

export default App;
