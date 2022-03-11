# react-native-zapt-sdk-example
## Getting started
To run the example just run  `$ yarn install` and `$ yarn android` or `$ yarn ios`.
### Link to location on maps
The function presented just below provides a link that can be used in a WebView or similar HTML rendering component. This link renders a map that shows the user's location in real time.

```javascript
getMapLink(this.placeID, {floorId: 1, displayButtonList: false, ...}, (mapLink) => {
	console.log(mapLink);
 });
```
### ZaptMap component

The `ZaptMap` component brings a real-time location map implementation, ready to be integrated into the APP.

````javascript
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

### Layout Options 

The `getMapLink` function (second parameter) and the `ZaptMap` component (`options` parameter) accept options to customize the map view.

| Name             | Type | Default | Description                                                  |
| :--------------- | ---- | ------- | ------------------------------------------------------------ |
| bottomNavigation | bool | true    | If true shows the bottom bar                                 |
| appBar           | bool | true    | If true shows the top bar                                    |
| search           | bool | true    | If true shows search field (on large screens)                |
| splash           | bool | true    | If true shows Zapt Tech splash, if false shows generic splash |
| navBar           | bool | true    | If true shows the nav bar                                    |
| embed            | bool | false   | If true removes all options                                  |

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
