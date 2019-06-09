import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import './App.css';
import { async } from 'q';
import autocorrect from 'autocorrect'


var autocorrect1 = require('autocorrect')
const API_KEY = "056237fbca01e07d86c7731206e6ae63";


class App extends React.Component{

  state = {
    temperature: undefined,
    city: undefined,
    humidity: undefined,
    clouds: undefined,
    description:undefined,
    country:undefined,
    icon:undefined
  }

  getWeather = async (e) =>{
    e.preventDefault();
    
    const city = e.target.elements.city.value
    const country = "US"
    const api_call = await fetch ('https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=' + API_KEY+ '&units=imperial' );
    const data = await api_call.json();
    console.log(data);
    if(city){
      this.setState({
        temperature: Math.round(data.main.temp) + '°F',
        city:data.name,
        humidity:Math.round(data.main.humidity) + '%',
        clouds:data.clouds.all,
        description:data.weather[0].description,
        country: data.sys.country,
        icon: 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png',
        error: ""
      });
    }
    else  {
      this.setState({
        temperature: undefined,
        city:undefined,
        humidity:undefined,
        clouds:undefined,
        description:undefined,
        country: undefined,
        icon:undefined,
        error: "Please enter a valid city"
      
    }); 
   
  }
}


render() {
  return (
    <div>
      <div className="wrapper">
        
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Titles/>
              </div>
              <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather} />
                <div className = "img">
                <img src = {this.state.icon}></img>
                </div>
                <Weather 
                  temperature={this.state.temperature} 
                  humidity={this.state.humidity}
                  city={this.state.city}
                  country={this.state.country}
                  description={this.state.description}
                  error={this.state.error}
                />
                
              </div>

            </div>
          </div>
        </div>
      </div>
    
  );
}
};  

export default App;
