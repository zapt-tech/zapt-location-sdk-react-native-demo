
import React, { Component } from 'react';
import {ZaptMap} from 'react-native-zapt-sdk'

class App extends Component {
  state = {
    mapLink: '',
  };

  placeID = '-ltvysf4acgzdxdhf81y';
  options = {
      floorId: 1
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
    />
  }
}

export default App;
