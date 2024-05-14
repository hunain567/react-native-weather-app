import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const searchWeather = async () => {
    try {
      // Make API call to fetch weather data based on city
      // Replace 'YOUR_API_KEY' with your actual API key
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data: ', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={city}
            onChangeText={text => setCity(text)}
          />
          <Button title="Search" onPress={searchWeather} />
        </View>

        {weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.cityName}>{weatherData.name}</Text>
            <Text style={styles.temperature}>
              {Math.round(weatherData.main.temp - 273.15)}°C
            </Text>
            {/* Additional weather data can be displayed here */}
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Adds a semi-transparent overlay to the background image
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
    color: '#fff', // Text color
  },
  weatherContainer: {
    alignItems: 'center',
  },
  cityName: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fff', // Text color
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff', // Text color
  },
});

export default HomeScreen;
