import React, {Component} from 'react'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, AppRegistry } from 'react-native'
import firebase from 'react-native-firebase'
import {Navigation} from 'react-native-navigation';


type Props = {};
export default class SignUp extends Component<Props> {
    constructor() {
        super();
      }
  state = { 
            email: '',
            password: '',
            errorMessage: null,
            isLoading: false
         }  
  handleLogin = () => {
    const { email, password } = this.state

    if(this.state.login === '' || this.state.password === '') {
      this.setState({
        incorrect: true,
        errorMessage: 'Both login and password need to be filled.'
      });
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.goToScreen('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
      this.setState({
          isLoading: false
      })
  }



  render() {
      if(this.state.isLoading){
        return (
            <View style={styles.container}>
              <Text>Loading</Text>
              <ActivityIndicator size="large" />
            </View>
          )
      } else{
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    )
        }
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

AppRegistry.registerComponent('SignUp', () => SignUp);