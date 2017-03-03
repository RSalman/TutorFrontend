import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import TopNavBar from './TopNavBar';

export default class Request extends Component {
  constructor() {
    super();
  }
  render() {
    const { toggled } = this.props;
    return (
      <View style={style.container}>
        <TopNavBar toggled={toggled} />
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
});
