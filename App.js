
import React, { Component } from 'react';
import {ZaptMap, getMapLink} from 'react-native-zapt-sdk'

class App extends Component {
  state = {
    mapLink: '',
  };

  placeID = '-ltvysf4acgzdxdhf81y';
  options = {
      floorId: 1,
      zoom: -3,
      appBar: false,

      markerX: 1710,
      markerY: 810,
      markerZ: 1,
    };

  componentDidMount() {
    getMapLink(this.placeID, this.options).then((mapLink) => {
      this.setState({
        mapLink: mapLink
      });
    });
  }

  render() {
    return <ZaptMap
      placeID={this.placeID}
      options={this.options}
    />
  }
}

export default App;
