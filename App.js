import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContext } from "react-navigation";
import BingoCard from "./src/Components/BingoCard";
import HomeScreen from "./src/HomeScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Bingo: BingoCard
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);