import React, {Component} from 'react'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, AppRegistry } from 'react-native'
import firebase from 'react-native-firebase'
import {Navigation} from 'react-native-navigation';

type Props = {};
export default class Main extends Component<Props> {
    constructor() {
        super();
      }
 
  render() {
        return (
            <View style={styles.container}>
              <Text>Loading</Text>
              <ActivityIndicator size="large" />
            </View>
          )
      }
    }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})

AppRegistry.registerComponent('Main', () => Main);