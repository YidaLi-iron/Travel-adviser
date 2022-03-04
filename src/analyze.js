import {useState} from "react";
import axios from "axios";

function Analyze(props) {
    const [data, setData] = useState(props.data);
    const [data1, setData1] = useState(props.data1);
    const [data2, setData2] = useState(props.data2);
    const [startingDate, setstartingDate] = useState(props.startingDate);
    // const [precip, setPrecip] = useState([]);
    // const [humidity, setHumidity] = useState([]);
    // const [windspeed, setWindspeed] = useState([]);
    console.log(data2)
    // console.log(data2)

    let precipprob, humidity, windspeed
    for (let day of data.days) {
        if (day.datetime == startingDate) {
            precipprob = day.precipprob
            humidity = day.humidity
            windspeed = day.windspeed
            break;
        }
    }

    let precipprob1, humidity1, windspeed1
    for (let day of data1.days) {
        if (day.datetime == startingDate) {
            precipprob1 = day.precipprob
            humidity1 = day.humidity
            windspeed1 = day.windspeed
            break;
        }
    }

    //
    // for (let value of Object.values(data1['days'])) {
    //     for (let precipprob of Object.values(value['precipprob'])) {
    //         setPrecip([...precip, precipprob])
    //     }
    //
    //     for (let humid of Object.values(value['humidity'])) {
    //         setHumidity([...humidity, humid])
    //     }
    //
    //     for (let wind of Object.values(value['windspeed'])) {
    //         setWindspeed([...windspeed, wind])
    //     }
    //
    // }
    //
    const distance1 = {
        method: 'GET',
        url: 'https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix',
        params: {
            origins: data2.latitude + ',' + data2.longitude,
            destinations: data.latitude + ',' + data.longitude
        },
        headers: {
            'x-rapidapi-host': 'trueway-matrix.p.rapidapi.com',
            'x-rapidapi-key': '5af58ad3e2msh6fa59a7265f9571p101d5djsn359c9e7638ec'
        }
    };

    axios.request(distance1).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
    
    const distance2 = {
        method: 'GET',
        url: 'https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix',
        params: {
            origins: data2.latitude + ',' + data2.longitude,
            destinations: data1.latitude + ',' + data1.longitude
        },
        headers: {
            'x-rapidapi-host': 'trueway-matrix.p.rapidapi.com',
            'x-rapidapi-key': '5af58ad3e2msh6fa59a7265f9571p101d5djsn359c9e7638ec'
        }
    };
    
    axios.request(distance2).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

    return (
        <div>bbb</div>
    );

}

export default Analyze;