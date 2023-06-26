import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {Component} from 'react';

import MapView, {Marker} from 'react-native-maps';

import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyA9mJZ_997tgVQAwSLlJGKNIlMAe0Xyqj4');

interface Istate {
  locationValues: any;
  position: any;
}

export class Map1 extends Component<Istate> {
  // componentDidMount(): void {
  //   this.getPosition();
  // }

  // getPosition = () => {
  //   Geolocation.getCurrentPosition(position => {
  //     // const currentLongitude = JSON.stringify(position.coords.longitude);
  //     const {latitude} = position.coords;
  //     console.log('data', latitude);
  //   });
  // };

  // requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Cool Photo App Camera Permission',
  //         message:
  //           'Cool Photo App needs access to your camera ' +
  //           'so you can take awesome pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the Location');
  //     } else {
  //       console.log('Location permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  state = {
    locationValues: {
      latitude: 17.376262847127638,
      longitude: 78.52636646479368,
    },
    position: '',
  };

  handleMap = (event: any) => {
    const {coordinate} = event.nativeEvent;
    const {latitude, longitude} = coordinate;
    console.log('location', longitude);
    console.log(coordinate);
    this.setState({lat: latitude, long: longitude});
    Geocoder.from(latitude, longitude)
      .then((response: any) => {
        const address = response.results[0].formatted_address;
        this.setState({position: address, locationValues: coordinate});
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  //  getOneTimeLocation = () => {

  //   Geolocation.getCurrentPosition(
  //     //Will give you the current location
  //     (position) => {

  //       //getting the Longitude from the location json
  //       const currentLongitude =
  //         JSON.stringify(position.coords.longitude);

  //       //getting the Latitude from the location json
  //       const currentLatitude =
  //         JSON.stringify(position.coords.latitude);

  //       //Setting Longitude state
  //       // setCurrentLongitude(currentLongitude);

  //       //Setting Longitude state
  //       // setCurrentLatitude(currentLatitude);
  //     },
  //     // (error) => {
  //     //   setLocationStatus(error.message);
  //     // },
  //     // {
  //     //   enableHighAccuracy: false,
  //     //   timeout: 30000,
  //     //   maximumAge: 1000
  //     // },
  //     console.log(currentLongitude);

  //   );

  // };

  render() {
    const {position} = this.state;
    const final = position.split(',');

    return (
      <View style={{flex: 1}}>
        <MapView
          onPress={this.handleMap}
          style={{height: 600, width: '100%'}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={this.state.locationValues}
            title="marker"
            description="sai"
          />
        </MapView>
        <View style={style.card}>
          <Text>Login Details</Text>
          <TextInput style={style.input} value={final[0]} />
          <TextInput style={style.input} value={final[1]} />
          <TextInput style={style.input} value={final[2]} />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  input: {
    height: 40,
    width: '80%',
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: '#bfbdbd',
    //@ts-ignore
    borderWidth: 0,
  },
  card: {
    padding: 30,
  },
});

export default Map1;
