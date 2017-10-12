import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import StyledText from './StyledText';

const TopNavBar = ({ toggled, tabName }) => (
  <View style={style.container}>
    <StyledText style={style.tabName}>{tabName}</StyledText>
  </View>
);
const transparent = 'transparent';
const grey = '#f2f2f2';
const style = StyleSheet.create({
  container:{
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: transparent,
  },
  tabName:{
    backgroundColor: transparent,
    textAlign: 'center',
    fontSize: 20,
    flex: 1
  }
});
export default TopNavBar;
