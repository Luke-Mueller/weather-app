import React, { Component } from 'react';

import classes from './Weather.module.css';
import CitiesList from '../../components/CitiesList/CitiesList';
import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import WeatherDisplay from '../../components/WeatherDisplay/WeatherDisplay';
import Spinner from '../../components/Spinner/Spinner';
import Toolbar from '../../components/Toolbar/Toolbar';
import ForecastDisplay from '../../components/ForecastDisplay/ForecastDisplay';
const API_KEY = '8255d1850797d8e23d1523be11d8b8b6';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

class Weather extends Component {
  state = {
    error: '',
    loading: false,
    showFormModal: true,
    cities: []
  }

  noResults = (input) => {
    if (input === '') this.setState({error: `No city entered`, loading: false});
    else this.setState({error: `"${input}" not found`, loading: false});

    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    wait(3500).then(() => {
      this.setState({error: ''})
    });
  }

  singleResult = (city) => {
    if (city.country !== 'US') this.getDataHandler(city.id);
      else if(city.country === 'US') {
      fetch(proxyUrl + `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x=${city.coord.lon}&y=${city.coord.lat}&benchmark=Public_AR_Census2010&vintage=Census2010_Census2010&layers=14&format=json`)
        .then(res => res.json())
        .then(data => {
          this.getDataHandler(city.id);
          this.setState({
            state: data.result.geographies["Census Blocks"][0].STATE,
          });
        })
      }
  }

  multiResults = (cities) => {
    console.log(cities)
    let cityStates = [];
    for(let i = 0; i < cities.length; i++) {
      if(cities[i].country !== 'US') {
        cityStates.push(cities[i])
      } else {
        fetch(proxyUrl + `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x=${cities[i].coord.lon}&y=${cities[i].coord.lat}&benchmark=Public_AR_Census2010&vintage=Census2010_Census2010&layers=14&format=json`)
        .then(res => res.json())
        .then(data => {
          cities[i].state = data.result.geographies["Census Blocks"][0].STATE; 
          cityStates.push(cities[i]);
          return cityStates
        })
        .then(() => {
          this.setState({cities: cityStates, loading: false})
        })
      } 
    }
  }
    
  searchHandler = (e) => {
    const input = e.target.elements.city.value;
    this.setState({loading: true});
    const cities = [];
  

    fetch('city.list.json')
      .then(res => res.json())
      .then(cityList => {
        // eslint-disable-next-line no-unused-vars
        for(let city of cityList) {
          if(city.name.toLowerCase() === input.toLowerCase()) cities.push(city)
        }
        if(cities.length === 0 || input === '') {
          this.noResults(input);
        } else if(cities.length === 1) {
          this.singleResult(cities[0])
        } else if(cities.length > 1) {
          this.multiResults(cities)
        };
      })
    e.target.elements.city.value = '';
    e.preventDefault();
  };

  getDataHandler = (id) => {
    this.setState({cities: []});
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&units=imperial&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          weather: data,
        })
      })
      .catch(err => {
        console.log(err)
      });
      
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=imperial&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          forecast: data,
          showFormModal: false,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getDataFromListHandler = (e) => {
    this.getDataHandler(e.target.id)
    e.preventDefault();
  };

  changeLocation = () => {
    this.setState({
      showFormModal: true, 
      cities: null, 
      weather: null,
      forecast: null,
      state: null
    })
  };

  render() {
    let citiesList,
        forecastDisplay,
        spinner,
        toolbar,
        weatherDisplay;

    this.state.loading ? spinner = <Spinner /> : spinner = null;

    this.state.cities && this.state.cities.length > 1 && !this.state.loading && !this.state.forecast ?
      citiesList = <CitiesList cities={this.state.cities} getData={this.getDataFromListHandler}/> 
      : citiesList = null;
    
    if(this.state.weather && !this.state.showFormModal) {
      weatherDisplay = <WeatherDisplay weather={this.state.weather} state={this.state.state} changeLocation={this.changeLocation}/>
      toolbar = <Toolbar />
    };

    this.state.forecast && !this.state.showFormModal ? 
      forecastDisplay = <ForecastDisplay forecast={this.state.forecast}/>
      : forecastDisplay = null;

    return (
      <div className={classes.Weather}>
        <Modal show={this.state.showFormModal}>
          <Form
            search={this.searchHandler}
            error={this.state.error} />
        </Modal>
        {spinner}
        {citiesList}
        {weatherDisplay}
        {toolbar}
        {forecastDisplay}
      </div>
    )
  }
}

export default Weather;


// multiResults = (cities) => {
//   console.log(cities)
//   let cityStates = [];
//   for(let i = 0; i < cities.length; i++) {
//     if(cities[i].country !== 'US') {
//       cityStates.push(cities[i])
//     } else {
//       fetch(proxyUrl + `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x=${cities[i].coord.lon}&y=${cities[i].coord.lat}&benchmark=Public_AR_Census2010&vintage=Census2010_Census2010&layers=14&format=json`)
//       .then(res => res.json())
//       .then(data => {
//         cities[i].state = data.result.geographies["Census Blocks"][0].STATE; 
//         cityStates.push(cities[i]);
//         this.setState({cities: cityStates})
//       })
//     } 
//   }
//   this.setState({loading: false});
// }