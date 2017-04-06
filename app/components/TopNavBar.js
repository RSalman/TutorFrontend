import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';

const TopNavBar = ({ toggled, tabName }) => (
  <View style={style.container}>
    <Button
      buttonStyle={style.buttonStyled}
      icon={{ name: 'menu', color: 'black' }}
      onPress={toggled}
    />
    <Text style={style.tabName}>{tabName}</Text>
  </View>
);
const transparent = 'transparent';
const grey = '#f2f2f2';
const style = StyleSheet.create({
  container:{
    backgroundColor: grey,
    marginTop: 20,
    flexDirection: 'row'
  },

  buttonStyled: {
    width: 50,
    height: 50,
    backgroundColor: transparent,
  },
  tabName:{
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 50,
    width: 150,
    height: 50,
    marginLeft: 40,
    fontWeight: 'bold'
  }
});
export default TopNavBar;
