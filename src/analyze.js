import {useState} from "react";
import axios from "axios";

function Analyze(props) {
    const[data, setData] = useState({});
    const[data1, setData1] = useState({});
    const[data2, setData2] = useState({});
    const [precip, setPrecip] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [windspeed, setWindspeed] = useState([]);

    let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+props.dest1+"?unitGroup=metric&key=ZPCPEUHNFPNKCPGAW85X3MPFS&contentType=json"
    fetch(url, {
        "method": "GET",
        "headers": {
        }
    })
        .then(response => { 
            return response.json()
        })
        .then(function(res){
    
            setData(res)
        })
        .catch(err => {
            console.error(err);
        });
        console.log(data)

        let url1 = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+props.dest2+"?unitGroup=metric&key=ZPCPEUHNFPNKCPGAW85X3MPFS&contentType=json"
        fetch(url1, {
            "method": "GET",
            "headers": {
            }
        })
            .then(response => { 
                return response.json()
            })
            .then(function(res1){
                setData1(res1)
            })
            .catch(err => {
                console.error(err);
            });
            console.log(data1)

            let url2 = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+props.currentLocation+"?unitGroup=metric&key=ZPCPEUHNFPNKCPGAW85X3MPFS&contentType=json"
            fetch(url2, {
                "method": "GET",
                "headers": {
                }
            })
                .then(response => { 
                    return response.json()
                })
                .then(function(res2){
                    console.log(res2)
                    setData2(res2)
                    console.log(data2)
                })
                .catch(err => {
                    console.error(err);
                });
                console.log(data2)





    for(let value of Object.values(data['days'])) {
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

    for(let value of Object.values(data1['days'])) {
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
          origins: Object.values(data2['latitude']) + ',' + Object.values(data2['longitude']),
          destinations: Object.values(data['latitude']) + ',' + Object.values(data['longitude'])
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
          origins: Object.values(data2['latitude']) + ',' + Object.values(data2['longitude']),
          destinations: Object.values(data1['latitude']) + ',' + Object.values(data1['longitude'])
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

      for (let value of precip.slice(0,15)) {
          var temp1 = temp1 + value
      }
      var precipprobability = temp1/15;
      precipprobability = precipprobability.toFixed(2);

      for (let value of precip.slice(15,30)) {
        var temp2 = temp2 + value
    }
    var precipprobability2 = temp2/15;
    precipprobability2 = precipprobability2.toFixed(2);

    for (let value of humidity.slice(0,15)) {
        var temp3 = temp3 + value
    }
    var avehumidity1 = temp3/15;
    avehumidity1 = avehumidity1.toFixed(2);

    for (let value of humidity.slice(15,30)) {
        var temp4 = temp4 + value
    }
    var avehumidity2 = temp4/15;
    avehumidity2 = avehumidity2.toFixed(2);

    for (let value of windspeed.slice(0,15)) {
        var temp5 = temp5 + value
    }
    var avewindspeed1 = temp5/15;
    avewindspeed1 = avewindspeed1.toFixed(2);

    for (let value of windspeed.slice(15,30)) {
        var temp6 = temp6 + value
    }
    var avewindspeed2 = temp6/15;
    avewindspeed2 = avewindspeed2.toFixed(2);

    return(
        <div></div>
    );

}

// Analyze.defaultProps = {
//     data: "1",
//     data1: "2",
//     data2: "3"
//   }

export default Analyze;