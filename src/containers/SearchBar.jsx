import React, { Component } from 'react';
import axios from 'axios';
import City from './City.jsx';
import { hashHistory } from 'react-router';
import { push } from 'react-router-redux';
import GoogleMap from './GoogleMap.jsx';
import Team from '../components/Team.jsx';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      state:'',
      location: '',
      autocomplete: ''
    };

    this.onLocationInputChange = this.onLocationInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    let input = document.getElementById("pac-input");
    const options = {
      types: ['(cities)'],
      componentRestrictions: {country: "us"}
    };
    let autocomplete = new google.maps.places.Autocomplete(input, options);
    this.setState({autocomplete: autocomplete});
    this.componentDidUpdate();
  }

  componentDidUpdate () {
    google.maps.event.addListener(this.state.autocomplete, 'place_changed', function() {
      fillInAddress();
    });
    const context = this;
    function fillInAddress() {
      let place = context.state.autocomplete.getPlace();
      if (!place.address_components) {
        let placeArray = place.name.split(",");
        context.setState({
          city: placeArray[0],
          state: placeArray[1],
          location: place.name
        }, () => {
          hashHistory.push(`/city/${context.state.city}/${context.state.state}`);
        });
      }  else {
      let cityAuto = place.address_components[0].long_name;
      let stateAuto;
      if (place.address_components[2].short_name === "US") {
        stateAuto = place.address_components[1].short_name;
      } else {
        stateAuto = place.address_components[2].short_name;
      }
     context.setState({
        city: cityAuto,
        state: stateAuto,
        location: cityAuto + ", " + stateAuto
      }, () => {
        hashHistory.push(`/city/${context.state.city}/${context.state.state}`);
      });
    }
  }
  }

  onLocationInputChange(event) {
    this.setState({location: event.target.value})
  }

  onFormSubmit(event) {
    event.preventDefault();
    const context = this;
    google.maps.event.addListener(this.state.autocomplete, 'place_changed', function() {
      fillInAddress();
    });
    function fillInAddress() {
      let place = context.state.autocomplete.getPlace();
      if (!place.address_components) {
        let placeArray = place.name.split(",");
        context.setState({
          city: placeArray[0],
          state: placeArray[1],
          location: place.name
        }, () => {
          hashHistory.push(`/city/${context.state.city}/${context.state.state}`);
        });
      } else {
      let cityAuto = place.address_components[0].long_name;
      let stateAuto;
      if (place.address_components[2].short_name === "US") {
        stateAuto = place.address_components[1].short_name;
      } else {
        stateAuto = place.address_components[2].short_name;
      }
      context.setState({
        city: cityAuto,
        state: stateAuto,
        location: cityAuto + ", " + stateAuto
      }, () => {
        hashHistory.push(`/city/${context.state.city}/${context.state.state}`);
      });
    }
    }
  }


  render() {
    var divStyle1 = {
      backgroundImage: 'url(images/slider/bg1.jpg)'
    };

    return (
    <div>
      <section id="main-slider" className="no-margin">
        <div className="carousel slide">
            <div className="carousel-inner">

                <div className="item active" style={divStyle1}>
                    <div className="container">
                        <div className="row slide-margin">

                          <div className="center wow fadeInDown">
                            <img src="./images/logo_main.png" />
                            <p className="neighborhood-header">Find your next neighborhood</p>
                          </div>

                          <div className="center">
                            <form onSubmit={(e)=>this.onFormSubmit(e)} className="input-group">
                              <input
                                placeholder="Enter a city to view its details"
                                className="form-control"
                                id="pac-input"
                                type="text"
                                value={this.state.location}
                                onChange={this.onLocationInputChange}
                              />
                              <span id="hide-button" className="input-group-btn">
                                  <button></button>
                              </span>
                            </form>
                          </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

          <section id="bottom">
          <div className="container wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
            <div className="row"></div>
          </div>
        </section>

        <Team />
  </div>

    );
  }
}



