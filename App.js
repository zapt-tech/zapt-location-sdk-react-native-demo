
import React, { Component } from 'react';
import { AppRegistry, NativeAppEventEmitter, NativeModules } from 'react-native';
import {
  ZaptMap,
  getMapLink,
  addLocationListener,
  calculateLocation,
  initialize,
  requestPermissionsBackground,
  setDisableSyncingForAnalytics,
  setDisableSyncingForPositioning
} from 'react-native-zapt-sdk'

const placeID = '-ltvysf4acgzdxdhf81y';

//Android background notifications
AppRegistry.registerHeadlessTask('ReactNativeZaptSdkBeaconsFound', ()=>{
  return function(data) {
    return new Promise(async (resolve)=>{
      console.info('JS ReactNativeZaptSdkBeaconsFound', data);
      if(data && data.beacons) {
        try {
          let beacons = JSON.parse(data.beacons);
          let location = await calculateLocation(placeID, beacons);
          if(location) {
            console.info('Location found', location);
          }
        } catch (error) {
          console.error(error);
        }
      }
      resolve();
    });
  }
});

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
    initialize(placeID).then(()=>{
      requestPermissionsBackground({
        titleAlert: "Esse app necessita de acesso a localização",
				messageAlert: "Para te apresentarmos notificações por proximidades necessitamos da permissão de localização sempre",
				titleNoGranted: "Funcionalidade limitada sem a permissão de localização",
				messageNoGranted: "Como a permissão de localização o tempo todo não foi concedida esse ap não vai te enviar as melhores notificações por proximidade. Para alterar a permissão acesse: Configurações -> Aplicativos -> Permissões e conceda a permissão total"
      }).then(async ()=> {
        await setDisableSyncingForAnalytics(false);
        await setDisableSyncingForPositioning(true);
        getMapLink(placeID, this.options).then((mapLink) => {
          this.setState({
            mapLink: mapLink
          });
        });

        NativeAppEventEmitter.addListener('ReactNativeZaptSdkBeaconsFound', (event)=>{
          console.info('beacon found event', event);
        });

        NativeAppEventEmitter.addListener('ReactNativeZaptSdkBeaconsRegionExit', (event) => {
          console.info('ReactNativeZaptSdkBeaconsRegionExit', event);
        });

        NativeAppEventEmitter.addListener('ReactNativeZaptSdkBeaconsRegionEnter', (event) => {
          console.info('ReactNativeZaptSdkBeaconsRegionEnter', event);
        });

        /* Receiving location update */
        addLocationListener(placeID, (location)=> {
          console.info('Location found', location);
        });
      });
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
