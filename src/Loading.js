import React, {Component} from 'react'
import { View, Text, ActivityIndicator, StyleSheet, AppRegistry, StatusBar } from 'react-native'
import firebase from 'react-native-firebase'
import {Navigation} from 'react-native-navigation';

type Props = {};
export default class Loading extends Component<Props> {
    constructor() {
        super();
      }

      navigationButtonPressed({ buttonOne }) {
        console.log("haha");
      }
      testhaha = () =>{
        console.log("haha");
      }

      handleTitlePress(){
        console.log("haha");
      }

      goToScreen = (screen) => {
        Navigation.push(this.props.componentId, {
          component: {
            name: screen,
            options: {
              topBar: {
                rightButtons: [
                  {
                    id: 'buttonOne',
                    text: 'LOGOUT',
                  },
                ],
                title: {
                  text: screen
                },
                passProps: {
                  oonPress: this.handleTitlePress
               } 
              }
            },
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
        <StatusBar hidden />
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