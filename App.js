import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Pages/Home';
import News from './Pages/News';
import ShortComments from './Pages/ShortComments';
import LongComments from './Pages/LongComments';
import Before from './Pages/Before';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="Before" component={Before}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="News" component={News}
          options={{
            title: "",
          }}
        />
        <Stack.Screen name="ShortComments" component={ShortComments}
          options={{
            title: "短评论",
          }}
        />
        <Stack.Screen name="LongComments" component={LongComments}
          options={{
            title: "长评论",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({})
