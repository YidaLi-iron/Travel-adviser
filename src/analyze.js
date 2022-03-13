import {useState} from "react";
import './App.css';
import axios from "axios";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function Analyze(props) {
    // trasfer data from userinput to analyze
    const [data, setData] = useState(props.data);
    const [data1, setData1] = useState(props.data1);
    const [data2, setData2] = useState(props.data2);
    const [startingDate, setstartingDate] = useState(props.startingDate);

    // get rainy possibility, moisture level, and wind speed of destination 1
    let precipprob, humidity, windspeed
    for (let day of data.days) {
        if (day.datetime == startingDate) {
            precipprob = day.precipprob
            humidity = day.humidity
            windspeed = day.windspeed
            break;
        }
    }

    // get rainy possibility, moisture level, and wind speed of destination 2
    let precipprob1, humidity1, windspeed1
    for (let day of data1.days) {
        if (day.datetime == startingDate) {
            precipprob1 = day.precipprob
            humidity1 = day.humidity
            windspeed1 = day.windspeed
            break;
        }
    }

    // set variable for the result of final recommendation.
    let precipCompare, humidityCompare, windspeedCompare, displacementCompare, timeComepare,
        grade1 = 0, grade2 = 0

    const [locationDetail, setLocationDetail] = useState({})
    const time = () => {

        let detail = {}
        detail.displacement1 = dist1.distances[0][0];
        detail.displacement2 = dist1.durations[0][1];
        detail.timeCar1 = Math.round(parseInt(dist1.durations[0][0]) / 3600); 
        detail.timeFlight1 = Math.round((parseInt(dist1.distances[0][0]) / 1000) / 900);
        detail.timeCar2 = Math.round(parseInt(dist1.durations[0][1]) / 3600);
        detail.timeFlight2 = Math.round((parseInt(dist1.distances[0][1]) / 1000) / 900);
        detail.Distance1 = Math.round((parseInt(dist1.distances[0][0]) / 1000));
        detail.Distance2 = Math.round(parseInt(dist1.distances[0][1]) / 1000);

        // using the time for each way to get the recommend way for destination1
        if (detail.timeCar1 <= detail.timeFlight1 || detail.timeFlight1 == 0) {
            detail.recommendWay1 = "CAR";
            detail.way1Co2 = Math.round(118 * detail.Distance1 / 1000);
            detail.recommendTime1 = detail.timeCar1;
        } else {
            detail.recommendWay1 = "FLIGHT";
            detail.way1Co2 = Math.round(160 * detail.Distance1 / 1000);
            detail.recommendTime1 = detail.timeCar1;
        }

        // using the time for each way to get the recommend way for destination2
        if (detail.timeCar2 <= detail.timeFlight2 || detail.timeFlight2 == 0) {
            detail.recommendWay2 = "CAR";
            detail.way2Co2 = Math.round(118 * detail.Distance2 / 1000);
            detail.recommendTime2 = detail.timeCar2;
        } else {
            detail.recommendWay2 = "FLIGHT";
            detail.way2Co2 = Math.round(160 * detail.Distance2 / 1000);
            detail.recommendTime2 = detail.timeCar2;
        }

        if (precipprob < precipprob1) {
            grade1 += 1;
        } else {
            grade2 += 1;
        }

        if (windspeed < windspeed1) {
            grade1 += 1;
        } else {
            grade2 += 1;
        }

        if (detail.recommendTime1 < detail.recommendTime2) {
            grade1 += 1;
        } else {
            grade2 += 1;
        }

        if (detail.way1Co2 < detail.way2Co2) {
            grade1 += 2;
        } else {
            grade2 += 2;
        }

        if (grade1 >= grade2) {
            detail.finalDist = data.address;
            detail.finalRecommend = detail.recommendWay1;
            detail.co2Saved = detail.way2Co2 - detail.way1Co2;
            timeComepare = detail.recommendTime2 - detail.recommendTime1;

        } else {
            detail.finalDist = data1.address;
            detail.finalRecommend = detail.recommendWay2;
            detail.co2Saved = detail.way1Co2 - detail.way2Co2;
            timeComepare = detail.recommendTime1 - detail.recommendTime2;
        }


        displacementCompare = detail.displacement1 - detail.displacement2;
        detail.tree = detail.co2Saved * 40;

        setLocationDetail(detail);
    }

    // get distance and duration by using API
    let dist1 = {};
    const distance1 = {
        method: 'GET',
        url: 'https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix',
        params: {
            origins: data2.latitude + ',' + data2.longitude,
            destinations: data.latitude + ',' + data.longitude + ';' + data1.latitude + ',' + data1.longitude
        },
        headers: {
            'x-rapidapi-host': 'trueway-matrix.p.rapidapi.com',
            'x-rapidapi-key': 'e6ea9101c7msh96ca46bd7b26a68p1f760ajsnc5078a983e4e'
        }
    };
    axios.request(distance1).then(function (response) {
        dist1 = response.data
        console.log(response.data)
        console.log(dist1)
        time()
    }).catch(function (error) {
        console.error(error);
        time()
    });


    return (
        <div className="card-group">
            <div className='card'>
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} sx={{mb: 2}} color="text.secondary" gutterBottom>
                            DESTINATION: {data.address}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{mb: 2}}>
                            RECOMMEND WAY
                            <span className="item item1">{locationDetail.recommendWay1}</span>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{mb: 2}}>
                            CO2 EMISSION
                            <span className="item item1">{locationDetail.way1Co2}KG</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Rainy Possibility
                            <span className="item item2">{precipprob}%</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Moisture Level
                            <span className="item item2">{humidity}</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Wind Speed
                            <span className="item item2">{windspeed}</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Distance
                            <span className="item item2">{locationDetail.Distance1}KM</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Time Spend By Car
                            <span className="item item2">{locationDetail.timeCar1}H</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Time Spend By Flight
                            <span className="item item2">{locationDetail.timeFlight1==0?"N/A":(locationDetail.timeFlight1+"H")}</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className='card'>
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom sx={{mb: 2}}>
                            DESTINATION: {data1.address}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{mb: 2}}>
                            RECOMMEND WAY
                            <span className="item item1">{locationDetail.recommendWay2}</span>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{mb: 2}}>
                            CO2 EMISSION
                            <span className="item item1">{locationDetail.way2Co2}KG</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Rainy Possibility
                            <span className="item item2">{precipprob1}%</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Moisture Level
                            <span className="item item2">{humidity1}</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Wind Speed
                            <span className="item item2">{windspeed1}</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Distance
                            <span className="item item2">{locationDetail.Distance2}KM</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Time Spend By Car
                            <span className="item item2">{locationDetail.timeCar2}H</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Time Spend By Flight
                            <span className="item item2">{locationDetail.timeFlight2==0?"N/A":(locationDetail.timeFlight2+"H")}</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className='card'>
                <Card sx={{minWidth: 275}}>
                    <CardContent className="final">
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom sx={{mb: 2}}>
                            FINAL RECOMMENDATION
                        </Typography>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom sx={{mb: 1}}>
                            DESTINATION: {locationDetail.finalDist}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{mb: 2}}>
                            RECOMMEND WAY
                            <span className="item item2">{locationDetail.finalRecommend}</span>
                        </Typography>
                        <Typography variant="h6" component="div">
                            CO2 EMISSION Compared
                            <span className="item item3">{locationDetail.co2Saved}KG</span>
                        </Typography>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            <span className="item4">equal to {locationDetail.tree} trees absorb CO2 per day!</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Rainy Possibility Compared
                            <span className="item item2">{precipprob - precipprob1}%</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Moisture Level Compared
                            <span className="item item2">{Math.round(humidity - humidity1)}</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Wind Speed Compared
                            <span className="item item2">{Math.round(windspeed - windspeed1)}</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Distance Compared
                            <span className="item item2">{locationDetail.Distance1 - locationDetail.Distance2}KM</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Time Saved
                            <span className="item item2">{locationDetail.recommendTime1>locationDetail.recommendTime2?locationDetail.recommendTime1-locationDetail.recommendTime2:locationDetail.recommendTime2-locationDetail.recommendTime1}H</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

}


export default Analyze;