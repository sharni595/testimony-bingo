import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContext } from "react-navigation";

const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Testimony Bingo</Text>
        <View style ={styles.buttonContainer}>
          <Pressable onPress={() => navigation.navigate('Bingo')}
          style={styles.button}>
            <Text>Let's Play</Text>
          </Pressable>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({ 
container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#D0FFD6'
},
header: {
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'Avenir-Book'
},
buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
},
button: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5E2BC',
    padding: 20
}
});

export default HomeScreen;