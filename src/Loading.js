import React, {Component} from 'react'
import { View, Text, ActivityIndicator, StyleSheet, AppRegistry } from 'react-native'
import firebase from 'react-native-firebase'
import {Navigation} from 'react-native-navigation';

type Props = {};
export default class Loading extends Component<Props> {
    constructor() {
        super();
      }

      goToScreen = (screen) => {
        Navigation.push(this.props.componentId, {
          component: {
            name: screen,
            options: {
              topBar: {
                title: {
                  text: screen
                }
              }
            },
            passProps: {
              screen: screen,
            }
          }
        });
      }
      
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.goToScreen(user ? 'Main' : 'Login')
        })
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
    alignItems: 'center',
  }
})

AppRegistry.registerComponent('Loading', () => Loading);