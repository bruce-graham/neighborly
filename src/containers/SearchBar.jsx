import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchNeighborhoodData } from '../actions/action_fetchNeighborhoods.jsx';
import axios from 'axios';
import City from './City.jsx';
import{ Link }from 'react-router';
import { push } from 'react-router-redux'

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      state:''
    };

    this.onCityInputChange = this.onCityInputChange.bind(this);
    this.onStateInputChange = this.onStateInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCityInputChange(event) {
    this.setState({city: event.target.value})
  }

  onStateInputChange(event) {
    this.setState({state: event.target.value})
  }

  onFormSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    //grab city and state from this.state.city and this.state.state
    const url = '/api/neighborhoods/searchbycity/' + this.state.city + '/' + this.state.state;
    var that = this;
    const request = axios.get(url).then(function(response) {
      console.log('whats response', response);
      var mappedData = response.data.map(function(hood) {
        console.log('HOOD', hood);
        let homePrice;
        if (hood.zindex === undefined) {
          return {
            name: hood.name[0],
            latitude: hood.latitude[0],
            longitude: hood.longitude[0],
            homePrice: "Housing Price Not Available"
          }
        } else {
          return {
            name: hood.name[0],
            latitude: hood.latitude[0],
            longitude: hood.longitude[0],
            homePrice: hood.zindex[0]._ + " " + hood.zindex[0].$.currency
          }
        }
      });
      console.log(mappedData);
      that.props.fetchNeighborhoodData(mappedData);
    });
    this.setState({ city: ''});
    this.setState({ state: ''});
  }

  render() {
    return (
      <div>
      <form onSubmit={(e)=>this.onFormSubmit(e)} className="input-group">
        <input
        placeholder="Choose a city: "
        className="form-control"
        value={this.state.city}
        onChange={this.onCityInputChange}
        />
        <input
        placeholder="Choose a state"
        className="form-control"
        value={this.state.state}
        onChange={this.onStateInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
          />
        }
        }
        }
        </span>
      </form>
      <City />
      </div>
      );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchNeighborhoodData }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);