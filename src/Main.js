import React, {Component} from 'react'
import { StyleSheet, Text, View,  ActivityIndicator, AppRegistry, FlatList, StatusBar, TouchableOpacity, Header} from 'react-native'
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase'
import {Navigation} from 'react-native-navigation';

type Props = {};
export default class Main extends Component<Props> {

    constructor() {
        super();
        this.state = {
          data: [],
          error: null,
          isLoading: true
        };
        this.arrayholder = [];
      }
      

      goToScreen = (item) => {
        Navigation.showModal({
          stack: {
            children: [{
              component: {
                name: 'Details',
                options:{ topBar: { visible: false, height: 0, } },
                passProps: {
                  data: item
                },
              }
            }]
          }
        });
      }

      goToScreen2 = (screen) => {
        Navigation.push(this.props.componentId, {
          component: {
            name: screen,
            options:{ topBar: { visible: false, height: 0, } }
          }
        });
      }
    
      componentDidMount = async() =>{
        this.callApi();
        this.props.oonPress;
      }

      signOut = async () => {
        try {
            await firebase.auth().signOut();
            this.goToScreen2('Login')
        } catch (e) {
            console.log(e);
        }
    }

      callApi = () => {
        const url = 'https://swapi.co/api/people/?format=json&page=1';
        this.setState({ loading: true });
    
        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              data: res.results,
              error: res.error || null,
              loading: false,
            });
            this.arrayholder = res.results;
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      };

      searchFilterFunction = text => {
        this.setState({
          value: text,
        });
    
        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.name.toUpperCase()}`;
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData,
        });
      };

      renderHeader = () => {    
        return ( 
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center' ,flexDirection: 'row', backgroundColor: '#000000'}}>   
          <SearchBar        
            placeholder="Type Here..."
            round        
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false} 
            value={this.state.value}
            containerStyle={{ width: '80%', backgroundColor: '#000000'}}           
          />
          <TouchableOpacity onPress= {() => this.signOut()} >
            <Text style={{fontSize: 20, color: '#DDDDDD'}}>Logout</Text></TouchableOpacity>
          </View> 
        );  
      };
      render() {
        if (this.state.loading) {
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large"/>
            </View>
          );
        }
        return (
          <View style={{ flex: 1, backgroundColor: '#000000' }}>            
            {this.state.error &&
          <Text style={{ color: 'red' }}>
            {this.state.error}
          </Text>}
            <StatusBar hidden />
            <FlatList
              data={this.state.data}
              keyExtractor = {item => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.button} onPress={() => this.goToScreen(item)}>
                  <Text style={styles.text}>{item.name}</Text>
                  </TouchableOpacity>
              )}
              ListHeaderComponent={this.renderHeader}
            />
          </View>
        );
      }
    }
  

    


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#2D3035',
    alignItems: 'center',
    margin: 7,
    padding: 12,
    borderRadius: 10
  },
  text: {
    fontSize: 17,
    color: '#DDDDDD'
  }
})

AppRegistry.registerComponent('Main', () => Main);