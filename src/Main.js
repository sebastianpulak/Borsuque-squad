import React, {Component} from 'react'
import { StyleSheet, Text, View, ActivityIndicator, AppRegistry, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import firebase from 'react-native-firebase'
import {Navigation} from 'react-native-navigation';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

type Props = {};
export default class Main extends Component<Props> {
    constructor() {
        super();
        this.state = {
            isLoading: true
          }
      }


      componentDidMount(){
        return fetch('https://swapi.co/api/people/')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson
            }, function() {
                console.log(this.state.dataSource.results.length);
            });
          })
          .catch((error) => {
            console.error(error);
          });

      }
 
  render() {
    if(this.state.isLoading){
        return (
            <View style={styles.container}>
              <Text>Loading</Text>
              <ActivityIndicator size="large" />
            </View>
          )
        }

        let row = [];
        let rowsOfTiles = [];

        for (let i = 0; i < this.state.dataSource.results.length; i++){
            row.push(
                <View key={i}>
                  <TouchableOpacity style={styles.tile}>
                    <Text style={styles.tileTextName}>{this.state.dataSource.results[i].name}</Text>
                  </TouchableOpacity> 
                </View>
              );
              rowsOfTiles.push(
                <View style={styles.rowOfTiles} key={i}>
                  {row}
                </View>
              ); 
              row = [];
              if (i === this.state.dataSource.results.length - 1) {
                rowsOfTiles.push(
                  <View style={styles.rowOfTiles} key={i}>
                    {row}
                  </View>  
                )
              } 
              return (
              <ScrollView contentContainerStyle={styles.container}>
                  {rowsOfTiles}
              </ScrollView>
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
  },
  tile: {
    width: width,
    height: 100,
    margin: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: '#838c99',
  },
  rowOfTiles: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
})

AppRegistry.registerComponent('Main', () => Main);