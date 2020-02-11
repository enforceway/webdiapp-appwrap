import 'react-native-gesture-handler';
import React from 'react';
import MovieList from './components/list/MovieList'
import DetailsScreen from './components/detail/SliceDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
Stack
export default class HelloWorldApp extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="WonderHome" component={MovieList} options={{ title: 'List Overview' }}></Stack.Screen>
          <Stack.Screen name="DetailScreen" component={DetailsScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}