import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import TopNavBar from './TopNavBar';

export default class Profile extends Component {
  constructor() {
    super();
  }
  render() {
    const { toggled } = this.props;
    const { tabName } = this.props;
    return (
      <ScrollView style={style.container} >
        <TopNavBar toggled={toggled} tabName={tabName} />
        <View style={style.viewContainer} >
          <Text>Blue background</Text>
          {/*<Text>the text should go under this one</Text>*/}
        </View>
      </ScrollView>
    );
  }
}
const white = 'white';
const blue = '#8080ff';
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,

  },
  viewContainer: { backgroundColor: blue, }
});
