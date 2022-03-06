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

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

function Analyze(props) {
    const [data, setData] = useState(props.data);
    const [data1, setData1] = useState(props.data1);
    const [data2, setData2] = useState(props.data2);
    const [startingDate, setstartingDate] = useState(props.startingDate);
    // const [distance1, setDistance1] = useState({});
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

    
    for (let value of Object.values(data1['days'])) {
        for (let precipprob of Object.values(value['precipprob'])) {
            setPrecip([...precip, precipprob])
        }
    
        for (let humid of Object.values(value['humidity'])) {
            setHumidity([...humidity, humid])
        }
    
        for (let wind of Object.values(value['windspeed'])) {
            setWindspeed([...windspeed, wind])
        }
    
    }
    
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


    // const temp = JSON.parse(JSON.stringify(distance1))
    // console.log(temp['distances'][0][0])

    // let timeCar1, timeCar2, timePlane1, timePlane2

    return (
        <div></div>
    //     <div className='card'>
    //     <Card sx={{ minWidth: 275 }}>
    //     <CardContent>
    //       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //         DESTINATION: {data.address}
    //       </Typography>
    //       <Typography variant="h5" component="div">
    //         be{bull}nev{bull}o{bull}lent
    //       </Typography>
    //       <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //         adjective
    //       </Typography>
    //       <Typography variant="body2">
    //         well meaning and kindly.
    //         <br />
    //         {'"a benevolent smile"'}
    //       </Typography>
    //     </CardContent>
    //   </Card>

    //   <Card sx={{ minWidth: 275 }}>
    //     <CardContent>
    //       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //       DESTINATION: {data1.address}
    //       </Typography>
    //       <Typography variant="h5" component="div">
    //         be{bull}nev{bull}o{bull}lent
    //       </Typography>
    //       <Typography variant="body2">
    //         Rainy Possibility  {precipprob}%
    //         <br />
    //         {'"a benevolent smile"'}
    //       </Typography>
    //     </CardContent>
    //     <CardActions>
    //       <Button size="small">Learn More</Button>
    //     </CardActions>
    //   </Card>

    //   <Card sx={{ minWidth: 275 }}>
    //     <CardContent>
    //       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //         Word of the Day
    //       </Typography>
    //       <Typography variant="h5" component="div">
    //         be{bull}nev{bull}o{bull}lent
    //       </Typography>
    //       <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //         adjective
    //       </Typography>
    //       <Typography variant="body2">
    //         well meaning and kindly.
    //         <br />
    //         {'"a benevolent smile"'}
    //       </Typography>
    //     </CardContent>
    //     <CardActions>
    //       <Button size="small">Learn More</Button>
    //     </CardActions>
    //   </Card>
    //   </div>
    );

}

export default Analyze;