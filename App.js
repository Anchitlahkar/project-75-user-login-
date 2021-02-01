import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import writeStoryScreen from './screens/WriteStory';
import readStoryScreen from './screens/ReadStory';
import ReadStory from './screens/Story';
import LoginScreen from './screens/Login'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Write_Story: {
      screen: writeStoryScreen,
    },
    Read_Story: {
      screen: readStoryScreen,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        if (routeName === 'Write_Story') {
          return (
            <Image
              style={{ height: 32, width: 40 }}
              source={require('./assets/write.png')}
            />
          );
        } else if (routeName === 'Read_Story') {
          return (
            <Image
              style={{ height: 32, width: 32 }}
              source={require('./assets/read.png')}
            />
          );
        }
      },
    }),
  }
);

var AppNavigator = createSwitchNavigator({
  HomeScreen: LoginScreen,
  TabNavigator: TabNavigator,
});

const AppContainer = createAppContainer(AppNavigator);
// const AppContainer = createAppContainer(TabNavigator);
