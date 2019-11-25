import React, { Component } from 'react';

import CitiesList from '../../components/CitiesList/CitiesList';
import Modal from "../../components/Modal/Modal";
import WeatherDisplay from '../../components/WeatherDisplay/WeatherDisplay';
import Spinner from '../../components/Spinner/Spinner';
import ForecastDisplay from '../../components/ForecastDisplay/ForecastDisplay';

import classes from './Weather.module.css';

const API_KEY = '8255d1850797d8e23d1523be11d8b8b6';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

class Weather extends Component {
  state = {
    error: '',
    loading: false,
    showFormModal: true,
    state: undefined
  }

//  Searches for the city entered by the user in the modal

  searchHandler = (e) => {
    const input = e.target.elements.city.value;
    this.setState({loading: true});
    const cities = [];
  
    fetch('city.list.min.json')
      .then(res => res.json())
      .then(cityList => {
        // eslint-disable-next-line no-unused-vars
        for(let city of cityList) {
          if(city.name.toLowerCase() === input.toLowerCase()) {
            cities.push(city);
          }
        }
        if(cities.length === 0 || input === '') {
          this.noResults(input);
        } else if(cities.length === 1) {
          this.singleResult(cities[0]);
        } else if(cities.length > 1) {
          this.multiResults(cities);
        };
      })
      .catch(err => {
        this.setState({error: err, loading: false});
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        wait(3500).then(() => {
          this.setState({error: ''})
        });
      });

    e.target.elements.city.value = '';
    e.preventDefault();
  };

//  Displays an error message to the user if their city is not found

  noResults = (input) => {
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    if (input === '') {
      this.setState({cities : null, error: `No city entered`, loading: false});
    } else {
      this.setState({cities: null, error: `"${input}" not found`, loading: false});
    }

    wait(3500).then(() => {
      this.setState({error: ''});
    });
  };

//  Fetches weather data if the city search retrieves one result.

  singleResult = (city) => {
    if (city.country !== 'US') {
      this.getDataHandler(city.id);
    } else if(city.country === 'US') {
      fetch(proxyUrl + `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x=${city.coord.lon}&y=${city.coord.lat}&benchmark=Public_AR_Census2010&vintage=Census2010_Census2010&layers=14&format=json`)
        .then(res => res.json())
        .then(data => {
          this.setState({state: data.result.geographies["Census Blocks"][0].STATE,});
          this.getDataHandler(city.id);
        })
        .catch(err => {
          this.setState({error: err, loading: false});
          const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
          wait(3500).then(() => {
            this.setState({error: ''});
          });
        });
    };
  };

//  Fetches state location of US cities from geocoding API

  multiResults = (cities) => {
    let cityStates = [];

    for(let i = 0; i < cities.length; i++) {
      if(cities[i].country !== 'US') {
        cityStates.push(cities[i]);
        this.setState({cities: cityStates, loading: false});
      } else {
        fetch(proxyUrl + `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x=${cities[i].coord.lon}&y=${cities[i].coord.lat}&benchmark=Public_AR_Census2010&vintage=Census2010_Census2010&layers=14&format=json`)
        .then(res => res.json())
        .then(data => {
          cities[i].state = data.result.geographies["Census Blocks"][0].STATE; 
          cityStates.push(cities[i]);
          this.setState({cities: cityStates, loading: false});
        })
        .catch(err => {
          this.setState({error: err, loading: false});
          const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
          wait(3500).then(() => {
            this.setState({error: ''});
          });
        });
      };
    };
  };
   
//  Fetches weather data from openweathermaps API

  getDataHandler = (id) => {
    this.setState({cities: []});

    // fetches current weather data
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&units=imperial&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.setState({weather: data});
      })
      .catch(err => {
        this.setState({error: err, loading: false});
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        wait(3500).then(() => {
          this.setState({error: ''});
        });
      });
      
    //  fetches forecast data  
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

  getDataFromListHandler = e => {
    const id = e.target.parentElement.parentElement.id;
    this.getDataHandler(id);
    e.preventDefault();
  };

  changeLocation = () => {
    this.setState({
      showFormModal: true, 
      cities: null, 
      weather: null,
      forecast: null,
      state: null
    });
  };

  render() {

    //  Conditionally render components

    let citiesList,
        forecastDisplay,
        modal,
        spinner,
        weatherDisplay;

    if (
      this.state.cities && 
      this.state.cities.length > 1 && 
      !this.state.loading && 
      !this.state.forecast 
    ) { 
      citiesList = 
        <CitiesList 
          cities={this.state.cities} 
          getDataFromList={this.getDataFromListHandler} 
          setState={this.setStateHandler}/> 
    };

    if (this.state.forecast && !this.state.showFormModal) {
      forecastDisplay = <ForecastDisplay forecast={this.state.forecast}/>
    }; 

    if (this.state.showFormModal) {
      modal = 
      <Modal 
        error={this.state.error} 
        search={this.searchHandler}
        show={this.state.showFormModal} />
    };
    
    if (this.state.loading) spinner = <Spinner />;

    if (this.state.weather && !this.state.showFormModal) {
      weatherDisplay = 
        <WeatherDisplay 
          weather={this.state.weather} 
          state={this.state.state} 
          changeLocation={this.changeLocation}/>
    };

    return (
      <div className={classes.Weather}>
        {modal}
        {spinner}
        {citiesList}
        {weatherDisplay}
        {forecastDisplay}
      </div>
    )
  }
}

export default Weather;