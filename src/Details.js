import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry} from 'react-native';

type Props = {};
export default class Details extends Component<Props> {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Name: {this.props.data.name}</Text>
		<Text>Height: {this.props.data.height}</Text>
		<Text>Mass: {this.props.data.mass}</Text>
		<Text>Hair color: {this.props.data.hair_color}</Text>
		<Text>Skin color: {this.props.data.skin_color}</Text>
		<Text>Eye color: {this.props.data.eye_color}</Text>
		<Text>Birth year: {this.props.data.birth_year}</Text>
		<Text>Gender: {this.props.data.gender}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('Details', () => Details);