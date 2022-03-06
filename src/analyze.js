import {useState} from "react";
import './App.css';
import axios from "axios";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {light} from "@mui/material/styles/createPalette";


function Analyze(props) {
    const [data, setData] = useState(props.data);
    const [data1, setData1] = useState(props.data1);
    const [data2, setData2] = useState(props.data2);
    const [startingDate, setstartingDate] = useState(props.startingDate);
    console.log(data2)

    let precipprob, humidity, windspeed
    for (let day of data.days) {
        if (day.datetime == startingDate) {
            precipprob = day.precipprob
            humidity = day.humidity
            windspeed = day.windspeed
            break;
        }
    }
    console.log(precipprob)

    let precipprob1, humidity1, windspeed1
    for (let day of data1.days) {
        if (day.datetime == startingDate) {
            precipprob1 = day.precipprob
            humidity1 = day.humidity
            windspeed1 = day.windspeed
            break;
        }
    }


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
    // console.log(Object.keys(dist1).length)
    axios.request(distance1).then(function (response) {
        dist1 = response.data
        console.log(response.data)
        console.log(dist1)
    }).catch(function (error) {
        console.error(error);
    });
    // console.log(dist1)

    const [recommendWay1, setRecommendWay1] = useState("")
    const [way1Co2, setWay1Co2] = useState(0)
    const [displacement1, setDistance1] = useState(0)
    const [timeCar1, setTimeCar1] = useState(0)
    const [timeFlight1, setTimeFlight1] = useState(0)
    const [recommendWay2, setRecommendWay2] = useState("")
    const [way2Co2, setWay2Co2] = useState(0)
    const [displacement2, setDistance2] = useState(0)
    const [timeCar2, setTimeCar2] = useState(0)
    const [timeFlight2, setTimeFlight2] = useState(0)
    const [finalDist, setFinalDist] = useState(0)
    const [finalRecommend, setFinalRecommend] = useState(0)
    const [co2Saved, setCo2Saved] = useState(0)
    const [tree, setTree] = useState(0)
    const [recommendTime1, setRecommendTime1] = useState(0)
    const [recommendTime2, setRecommendTime2] = useState(0)
    // recommendWay1=""
    const time = () => {
        setTimeCar1(Math.round(parseInt(dist1.durations[0][0]) / 3600));
        setTimeFlight1(Math.round((parseInt(dist1.distances[0][0]) / 1000) / 900));
        setTimeCar2(Math.round(parseInt(dist1.durations[0][1]) / 3600));
        setTimeFlight2(Math.round((parseInt(dist1.distances[0][1]) / 1000) / 900));
        setDistance1(Math.round(parseInt(dist1.distances[0][0]) / 1000))
        setDistance2(Math.round(parseInt(dist1.distances[0][1]) / 1000))

        if (timeCar1 <= timeFlight1 || timeFlight1 == 0) {
            setRecommendWay1("CAR")
            setWay1Co2(Math.round(118 * displacement1 / 1000));
            console.log(way1Co2)
            setRecommendTime1(timeCar1);
        } else {
            setRecommendWay1("FLIGHT")
            setWay1Co2(Math.round(160 * displacement1 / 1000));
            setRecommendTime1(timeFlight1)
        }
        if (timeCar2 <= timeFlight2 || timeFlight2 == 0) {
            setRecommendWay2("CAR");
            setWay2Co2(Math.round(118 * displacement2 / 1000));
            setRecommendTime2(timeCar2);
        } else {
            setRecommendWay2("FLIGHT");
            setWay2Co2(Math.round(160 * displacement2 / 1000));
            setRecommendTime2(timeFlight2);
        }
        console.log(timeFlight2)
        // if (timeFlight1 == 0) {
        //     setTimeFlight1("N/A")
        // }
        // if (timeFlight2 == 0) {
        //     setTimeFlight2("N/A")
        // }
    }

    let precipCompare, humidityCompare, windspeedCompare, displacementCompare, timeComepare,
        grade1 = 0, grade2 = 0
    const final = () => {
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

        if (recommendTime1 < recommendTime2) {
            grade1 += 1;
        } else {
            grade2 += 1;
        }

        if (way1Co2 < way2Co2) {
            grade1 += 2;
        } else {
            grade2 += 2;
        }

        if (grade1 >= grade2) {
            setFinalDist(data.address);
            setFinalRecommend(recommendWay1)
            setCo2Saved(way2Co2 - way1Co2);
            timeComepare = recommendTime2 - recommendTime1;
        } else {
            setFinalDist(data1.address);
            setFinalRecommend(recommendWay2)
            setCo2Saved(way1Co2 - way2Co2);
            timeComepare = recommendTime1 - recommendTime2;
        }


        displacementCompare = displacement1 - displacement2;
        setTree(co2Saved * 40);
    }

    setTimeout(time, 5000);
    setTimeout(final, 5000);


    return (
        <div className="card-group">
            <div className='card'>
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom sx={{mb: 2}}>
                            DESTINATION: {data.address}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{mb: 2}}>
                            RECOMMEND WAY
                            <span className="item item1">{recommendWay1}</span>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{mb: 2}}>
                            CO2 EMISSION
                            <span className="item item1">{way1Co2}KG</span>
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
                            <span className="item item2">{displacement1}KM</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Time Spend By Car
                            <span className="item item2">{timeCar1}H</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Time Spend By Flight
                            <span className="item item2">{timeFlight1==0?"N/A":(timeFlight1+"H")}</span>
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
                            <span className="item item1">{recommendWay2}</span>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{mb: 2}}>
                            CO2 EMISSION
                            <span className="item item1">{way2Co2}KG</span>
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
                            <span className="item item2">{displacement2}KM</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Time Spend By Car
                            <span className="item item2">{timeCar2}H</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Time Spend By Flight
                            <span className="item item2">{timeFlight2==0?"N/A":(timeFlight2+"H")}</span>
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
                            DESTINATION: {finalDist}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{mb: 2}}>
                            RECOMMEND WAY
                            <span className="item item2">{finalRecommend}</span>
                        </Typography>
                        <Typography variant="h6" component="div">
                            CO2 EMISSION Compared
                            <span className="item item3">{co2Saved}KG</span>
                        </Typography>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            <span className="item4">equal to {tree} trees absorb CO2 per day!</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Rainy Possibility Compared
                            <span className="item item2">{precipprob - precipprob1}%</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Moisture Level Compared
                            <span className="item item2">{humidity - humidity1}</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Wind Speed Compared
                            <span className="item item2">{windspeed - windspeed1}</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Distance Compared
                            <span className="item item2">{displacement1 - displacement2}KM</span>
                        </Typography>
                        <Typography sx={{mb: 2}}>
                            Time Saved
                            <span className="item item2">{recommendTime1>recommendTime2?recommendTime1-recommendTime2:recommendTime2-recommendTime1}H</span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

}

export default Analyze;