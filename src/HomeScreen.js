import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View, Pressable, ImageBackground } from 'react-native';
import { NavigationContext } from "react-navigation";
//import { generateCard } from './Components/BingoCard'

const image = './assets/homepage.png'

const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/homepage.png')} resizeMode="cover" style={styles.image}>
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => {
              navigation.navigate('Bingo');
            }}
            style={styles.button}>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    )
  }

const styles = StyleSheet.create({ 
  container: {
      flex: 1,
  },
  buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  },
  button: {
    position: 'relative',
    width: '60%',
    height: '25%',
    marginTop: 50,
    padding: 20
  },
  image: {
      flex: 1,
      justifyContent: 'center',
  },
});

export default HomeScreen;