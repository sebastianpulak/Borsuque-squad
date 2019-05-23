import React, {Component} from 'react'
import { StyleSheet, Text, View,  ActivityIndicator, AppRegistry, FlatList, Dimensions, StatusBar} from 'react-native'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import { ListItem, SearchBar } from 'react-native-elements';


type Props = {};
export default class Main extends Component<Props> {
    constructor() {
        super();
        this.state = {
          loading: false,
          data: [],
          error: null,
          isLoading: true
        };
        this.arrayholder = [];
      }

      componentDidMount(){
        this.callApi();
      }

      callApi = () => {
        const url = 'https://swapi.co/api/people/?format=json';
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
    
      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '86%',
              backgroundColor: '#CED0CE',
              marginLeft: '14%',
            }}
          />
        );
      };
      renderHeader = () => {    
        return (      
          <SearchBar        
            placeholder="Type Here..."        
            lightTheme        
            round        
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false} 
            value={this.state.value}           
          />    
        );  
      };
      render() {
        if (this.state.loading) {
          return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator />
            </View>
          );
        }
        return (
          
          <View style={{ flex: 1 }}>
            <StatusBar hidden />
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <ListItem
                  title={`${item.name}`}
                />
              )}
              keyExtractor={item => item.name}
              ItemSeparatorComponent={this.renderSeparator}
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