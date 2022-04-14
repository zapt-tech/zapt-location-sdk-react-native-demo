
import React, { Component } from 'react';
import {ZaptMap, getMapLink, addLocationListener} from 'react-native-zapt-sdk'

const placeID = '-ltvysf4acgzdxdhf81y';

class App extends Component {
  state = {
    mapLink: '',
  };

  options = {
      floorId: 1,
      zoom: -3,
      appBar: false,

      markerX: 1710,
      markerY: 810,
      markerZ: 1,
    };

  componentDidMount() {
    getMapLink(placeID, this.options).then((mapLink) => {
      this.setState({
        mapLink: mapLink
      });
    });

    addLocationListener(placeID, (location) => {
      console.info(location);
    });
  }

  render() {
    return <ZaptMap
      placeID={placeID}
      options={this.options}
    />
  }
}

export default App;
