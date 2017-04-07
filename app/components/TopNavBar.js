import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import StyledText from './StyledText';

const TopNavBar = ({ toggled, tabName }) => (
  <View style={style.container}>
    <Button
      buttonStyle={style.buttonStyled}
      icon={{ name: 'menu', color: 'black' }}
      onPress={toggled}
    />
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

  buttonStyled: { backgroundColor: transparent, },
  tabName:{
    backgroundColor: transparent,
    textAlign: 'center',
    marginLeft: 30,
    alignSelf: 'center',
    fontSize: 20,
  }
});
export default TopNavBar;
