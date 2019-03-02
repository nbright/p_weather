import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from "./Weather";

const API_KEY ="060da4f375ad38f39f912edab77c832f";

export default class App extends React.Component {
  state = {
      isLoaded: false,
      error: null,
      temperature: null,
      name: null
  };
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        
        this._getWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
          this.setState({
            error: error
          })
        }
      );
  }
  _getWeather = (lat, long) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
      )
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({
        temperature:json.main.temp,
        name:json.weather[0].main,
        isLoaded: true
      })
    });
  };
  render() {
    const {isLoaded, error, temperature, name} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ?(
          <Weather weatherName={name} temp={Math.floor(temperature-273.15)} />
          ) : (
          <View style={styles.Loading}>
            <Text style={styles.loadingText}>Getting the fucking weather</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 40
  },
  Loading: {
    flex: 1,
    backgroundColor: "#FDF6AA",
    justifyContent: "flex-end",
    paddingLeft: 25
  },
  loadingText: {
    fontSize: 16,
    marginBottom:100
  }
});
