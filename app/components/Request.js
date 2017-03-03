import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class Request extends Component {
  constructor() {
    super();
  }
  render() {
    const { toggled } = this.props;
    return (
      <View style={style.container}>
        <Text style={style.marginText} />
        <Text onPress={toggled}>Click me to toggle the side</Text>
      </View>
    );
  }
}
const white = 'white';
const style = StyleSheet.create({
  container:{
    backgroundColor: white,
    flex: 1
  },
  marginText:{ height: 50 }
});
