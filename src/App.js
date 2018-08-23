import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
        fetch('http://api.wpushuttle.com/')
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

                    <ul>
                        {items.map(item => (
                            <li>
                                {item.bus_name} {item.bus_id}
                                <b> {item.id = '1' ? 'The Shuttle is at ' + (item.bus_name) : 'This shuttle is not running'}</b>
                            </li>
                        ))}
                    </ul>
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
            <h2>Header</h2>
             <img src={logo} className="App-logo" alt="logo" />
         </div>
      );
   }
}

class Footer extends Component {
   render() {
      return (
         <div>
            <h2>Footer</h2>
            <p>The Footer text!!!</p>
         </div>
      );
   }
}

export default App;
