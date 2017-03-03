import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import TopNavBar from './TopNavBar';

export default class Profile extends Component {
  constructor() {
    super();
  }
  render() {
    const { toggled } = this.props;
    return (
      <View style={style.container} >
        <TopNavBar toggled={toggled} />
        <View style={style.view1} >
          <Text>Blue background</Text>
        </View>
      </View>
    );
  }
}
const blue = '#8080ff';
const style = StyleSheet.create({
  container: { flex: 1 },
  view1: {
    flex: 1,
    backgroundColor: blue,
  }
});
