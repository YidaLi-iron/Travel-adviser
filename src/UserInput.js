import './App.css';
import React, { Component } from 'react';

export default class UserInput extends Component {
    state = {
        currentLocation: '',
        startingDate: '',
        dest1: '',
        dest2: '',
        data: []
    };

    data = [];

    handleChange = (event) => {
        const input = event.target;
        const value = input.value;

        this.setState({ [input.id]: value });
    };

    handleFormSubmit = () => {
        // const { currentLocation, startingDate, dest1, dest2 } = this.state;
        // localStorage.setItem('currentLocation', currentLocation);
        // localStorage.setItem('startingDate', startingDate);
        // localStorage.setItem('dest1', dest1);
        // localStorage.setItem('dest2', dest2);
        let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+this.state.dest1+"?unitGroup=metric&key=ZPCPEUHNFPNKCPGAW85X3MPFS&contentType=json"
          let that=this;
        fetch(url, {
            "method": "GET",
            "headers": {
            }
        })
            .then(response => { 
                return response.json()
            })
            .then(function(res){
                that.state.data=res;
            })
            .catch(err => {
                console.error(err);
            });
    };  


    render() {
        return (
            <div className="footer">
                <form className="user-input-form" action='#'>
                    <div className="button">
                        <button onClick={this.handleFormSubmit}>submit</button>
                    </div>
                    <div className="user-input-box">
                        <div className="user-input-box1">
                            <div>
                                <label className="label1" htmlFor="currentLocation">Current location</label>
                                <input id="currentLocation" className="Input" value={this.state.currentLocation} onChange={this.handleChange} />
                            </div>
                            <div>
                                <label className="label2" htmlFor="startingDate">Starting date</label>
                                <input id="startingDate" className="Input" value={this.state.startingDate} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="user-input-box2">
                            <div>
                                <label className="label1" htmlFor="dest1">Destination1</label>
                                <input id="dest1" className="Input" value={this.state.dest1} onChange={this.handleChange} />
                            </div>
                            <div>
                                <label className="label2" htmlFor="dest2">Destination2</label>
                                <input id="dest2" className="Input" value={this.state.dest2} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
