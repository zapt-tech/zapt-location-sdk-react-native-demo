# react-native-zapt-sdk-example

## Getting Started

To run the example just run  `$ yarn install` and `$ yarn android` or `$ yarn ios`.

### Minimum Requirements

| Requirement                               | Version        |
| ----------------------------------------- | -------------- |
| React.js                                  | 16.8.+         |
| React Native                              | 0.60.0+        |
| React Native WebView (for IOS)            | 9.0.0+         |
| XCode                                     | 9.0+           |
| Project target                            | iOS 9+         |
| Java Compiler                             | 1.8            |
| Android SDK versão mínima (minSdkVersion) | Android API 21 |
| Android Support Library v4                | 26+            |

For the correct operation of the <code>ZaptMap</code> component on iOS platforms, it is necessary to install the 'react-native-webview' package, which can be done using the following command: `npm i react-native-webview`.

Newer versions of React-Native perform the virtual link of libraries automatically, if you are using an older version or your project has an error when importing the library, try: `npx react-native link react-native-zapt-sdk`
### ZaptMap Component

The `ZaptMap` component brings a real-time location map implementation, ready to be integrated into the APP.

````javascript
 import { ZaptMap } from 'react-native-zapt-sdk';

export default class App extends Component {
  placeID = '-ltvysf4acgzdxdhf81y';
  options = {
      floorId: 1
    };
  render() {
    return (
      <ZaptMap 
        placeID={this.placeID}
	    options={this.options}
      />
    );
  }
}
````

Note: Both in the `getMapLink` function and in the `ZaptMap` component, the `placeID` parameter is required for the component to work. If you have not yet received your location's unique identifier (PLACE_ID), please contact us at contato@zapt.tech.

### Permissions Request
As soon as the Map is initialized in the APP for the first time, permission will be requested to access the device's location, but if necessary, this permission can be requested at an earlier time through the `requestPermissions()` function.

### Link to Maps

The function presented below provides a link that can be used in a WebView or similar HTML rendering component. This link renders a map that shows the user's location in real time.

```javascript
import { getMapLink } from 'react-native-zapt-sdk';

getMapLink(this.placeID, {floorId: 1, displayButtonList: false, ...}, (mapLink) => {
	console.log(mapLink);
 });
```

### Listen to Location Events

It is possible to listen to location events through the method: `addLocationListener(placeId, locationCallback)`.

A `locationCallback` is invoked with the following object:

| Attribute     | Type    | Description                                   |
| ------------- | ------- | --------------------------------------------- |
| floorId       | Integer | Location floor ID.                            |
| xy            | Array   | Location XY coordinates                       |
| nearestPoi    | Object  | Point of interest closest to current location |
| nearestBeacon | Object  | Beacon closest to current location            |

Example of use:

```javascript
import { addLocationListener } from 'react-native-zapt-sdk';

addLocationListener(placeID, (location) => {
  console.info(location);
});

// printed object
{
  "floorId": 1,
  "xy": [1830, 1540]
  "nearestPoi": {
    "categoryId": 5767574868459520,
    "floor": "1",
    "id": "-mtcg0mphsnqdrpc-ohk",
    "isTemporal": false,
    "tags": ["caixa econômica federal"],
    "text": "Banco Caixa - LOCALIZADO NO PISO 1",
    "title": "CAIXA ECONÔMICA FEDERAL",
    "x": 1870,
    "xy": "1870_1680",
    "y": 1680,
    "externalId": "510"
  }
}
```

### Stop Listening to Location Events

To stop listening to location events initiated by the method mentioned above, just call the method: `removeLocationListener()`.

Example of use;

```javascript
import {removeLocationListener} from 'react-native-zapt-sdk';

removeLocationListener()
```

### Receiving Background Events
To receive events in the background it is necessary to call the method: `requestPermissionsBackground()`.

On iOS, you need to:
1) add `Privacy - Location Always Usage Description` entry in Info.plist.
2) add the 'background mode' 

On Android, you need to:
1) add AppRegistry.registerHeadlessTask
2) add the entry `<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION"/>` in AndroidManifest
3) Add the init at the Application.java (see docs)
4) Test it using release deploy, in a real device.

Example of use:

```javascript
import React, { Component } from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';
import {initialize, requestPermissionsBackground, getMapLink, ZaptMap, addLocationListener } from 'react-native-zapt-sdk';

initialize(placeID).then(() => {
  requestPermissionsBackground().then(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.ReactNativeZaptSdk);
  
    eventEmitter.addListener('ReactNativeZaptSdkBeaconsFound', (event) => {
      console.info('beacon found event');
    });

    eventEmitter.addListener('ReactNativeZaptSdkBeaconsRegionExit', (event) => {
      console.info('ReactNativeZaptSdkBeaconsRegionExit');
    });

    eventEmitter.addListener('ReactNativeZaptSdkBeaconsRegionEnter', (event) => {
      console.info('ReactNativeZaptSdkBeaconsRegionEnter');
    });
  });
});
```

```javascript
//...
import { AppRegistry } from 'react-native';
import { calculateLocation } from 'react-native-zapt-sdk';
//...
AppRegistry.registerHeadlessTask('ReactNativeZaptSdkBeaconsFound', () => {
  return function(data){
    return new Promise(async (resolve) => {
      console.info('JS ReactNativeZaptSdkBeaconsFound', data);
      if(data && data.beacons) {
        //do your stuff here or get the location like below
        try {
          let beacons = JSON.parse(data.beacons);
          let location = await calculateLocation(placeID, beacons);
          if(location) {
            console.info('Location found', location);
          }
        } catch(e) {
          console.error(e);
        }
      }
      resolve();
    });
  }
});
```

### Layout Options 

The `getMapLink` function (second parameter) and the `ZaptMap` component (`options` parameter) accept options to customize the map view.

| Name                | Type | Default | Description                                                  |
| :------------------ | ---- | ------- | ------------------------------------------------------------ |
| bottomNavigation    | bool | true    | If true shows the bottom bar                                 |
| appBar              | bool | true    | If true shows the top bar                                    |
| displayZoomButton   | bool | true    | If true shows the zoom buttons                               |
| displayFloorsButton | bool | true    | If true shows the change floors button                       |
| search              | bool | true    | If true shows search field (on large screens)                |
| splash              | bool | true    | If true shows Zapt Tech splash, if false shows generic splash |
| navBar              | bool | true    | If true shows the nav bar                                    |
| embed               | bool | false   | If true removes all options                                  |

### Functional Options

In addition to the layout options, the options attribute also receives an option for map functionality.

| Name     | Type   | Description                                                  |
| -------- | ------ | ------------------------------------------------------------ |
| floorId  | string | Gets the ID of the floor on which the map should be launched. See this ID in the [Portal](https://portal.zapt.tech/#/). |
| zoom     | number | Set the initial zoom of the map. The zoom value must be between the minimum and maximum limits defined in the map settings. |
| rotation | number | Defines an initial map rotation angle. This value can be between 0 and 360. |
| poi      | string | Receives the ID of a point of interest and centers the map on it. See this ID in the [Portal](https://portal.zapt.tech/#/). |

### Center by Coordinates

| Name    | Type   | Description                                    |
| ------- | ------ | ---------------------------------------------- |
| centerX | number | Set the initial center of the map horizontally |
| centerY | number | Set the initial center of the map horizontally |

Note: The `centerX` and `centerY` attributes must be used at the same time to work.

### Plot routes with points of interest

| Name    | Type   | Description                                         |
| ------- | ------ | --------------------------------------------------- |
| fromPoi | string | ID of a point of interest for the start of a route. |
| toPoi   | string | ID of a point of interest for the start of a route. |

Note: You can add only the target point parameter. In this case the route will be drawn from the main entrance, if any. If only the starting point is entered, nothing will happen.

### Trace routes with coordinates

| Name            | Type   | Description                                     |
| --------------- | ------ | ----------------------------------------------- |
| fromCoordinateX | number | X coordinate (horizontal) for route origin      |
| fromCoordinateY | number | Y (vertical) coordinate for route origin        |
| fromCoordinateZ | number | Z coordinate (walk) for route origin            |
| toCoordinateX   | number | X coordinate (horizontal) for route destination |
| toCoordinateY   | number | Y (vertical) coordinate for route destination   |
| toCoordinateZ   | number | Z coordinate (walk) for route destination       |

Note: You can add only the target point parameter. In this case the route will be drawn from the main entrance, if any. If only the starting point is entered, nothing will happen.

### Draw marker

| Name    | Type   | Description                                              |
| ------- | ------ | -------------------------------------------------------- |
| markerX | number | X coordinates (horizontal) where marker should be drawn. |
| markerY | number | Y coordinates (horizontal) where marker should be drawn. |
| markerZ | number | Z coordinates (floor) where marker should be drawn.      |
