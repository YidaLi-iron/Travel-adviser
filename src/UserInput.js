import './App.css';
import React, {Component} from 'react';
import {useState} from 'react';
import Analyze from "./Analyze";
import Loading from "./Loading";

function UserInput() {
    // Set up place to store userinput and data return from weather API
    const [currentLocation, setCurrentLocation] = useState("");
    const [startingDate, setstartingDate] = useState("");
    const [dest1, setDest1] = useState("");
    const [dest2, setDest2] = useState("");
    const [data, setData] = useState({});
    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});
    const [isSubmit, setisSubmit] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    // when click submit, call this function to request API.
    function handleFormSubmit() {
        setisLoading(true) // show loading page when requesting data

        // return weather data for the first destination
        let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + dest1 + "?unitGroup=metric&key=E2BMHT6HB87MD893JXHUKR2N4&contentType=json"
        fetch(url, {
            "method": "GET",
            "headers": {}
        })
            .then(response => {
                return response.json()
            })
            .then(function (res) {
                setData(res)
            })
            .catch(err => {
                console.error(err);
            });
        
        // return weather data for the second destination
        let url1 = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + dest2 + "?unitGroup=metric&key=E2BMHT6HB87MD893JXHUKR2N4&contentType=json"
        fetch(url1, {
            "method": "GET",
            "headers": {}
        })
            .then(response => {
                return response.json()
            })
            .then(function (res) {
                setData1(res)
            })
            .catch(err => {
                console.error(err);
            });
        
        // return weather data for the current location
        let url2 = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + currentLocation + "?unitGroup=metric&key=E2BMHT6HB87MD893JXHUKR2N4&contentType=json"
        fetch(url2, {
            "method": "GET",
            "headers": {}
        })
            .then(response => {
                return response.json()
            })
            .then(function (res) {
                setData2(res)
            })
            .catch(err => {
                console.error(err);
            });
        
        // give API 5 seconds to return data
        setTimeout(()=>setisSubmit(true),5000)
        setTimeout(()=>setisLoading(false),5000)

    };

    return (
        <div className="footer">
            {isLoading && <Loading></Loading>}
            {isSubmit && <Analyze data={data} data1={data1} data2={data2} startingDate={startingDate} dest={dest1}/>}
            <form className="user-input-form" action='#'>
                <div className="button">
                    <button onClick={handleFormSubmit}>submit</button>
                </div>
                <div className="user-input-box">
                    <div className="user-input-box1">
                        <div>
                            <label className="label1" htmlFor="currentLocation">Current location</label>
                            <input id="currentLocation" className="Input" value={currentLocation}
                                   onChange={(e) => setCurrentLocation(e.target.value)}
                                   placeholder="city name. eg: Seattle"/>
                        </div>
                        <div>
                            <label className="label2" htmlFor="startingDate">Starting date</label>
                            <input id="startingDate" className="Input" value={startingDate}
                                   onChange={(e) => setstartingDate(e.target.value)}
                                   placeholder="yyyy-mm-dd"/>
                        </div>
                    </div>
                    <div className="user-input-box2">
                        <div>
                            <label className="label1" htmlFor="dest1">Destination1</label>
                            <input id="dest1" className="Input" value={dest1}
                                   onChange={(e) => setDest1(e.target.value)}
                                   placeholder="city name. eg: Portland"/>
                        </div>
                        <div>
                            <label className="label2" htmlFor="dest2">Destination2</label>
                            <input id="dest2" className="Input" value={dest2}
                                   onChange={(e) => setDest2(e.target.value)}
                                   placeholder="city name. eg: New York"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserInput;
