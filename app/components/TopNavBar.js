import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const TopNavBar = ({ toggled }) => (
  <View style={style.container}>
    <View style={style.topView} />
    <Button
      buttonStyle={style.buttonStyled}
      icon={{ name: 'menu' }}
      onPress={toggled}
    />
  </View>
);
const transparent = 'transparent';
const grey = '#96a3b7';
const style = StyleSheet.create({
  container:{ backgroundColor: grey },
  topView: { height: 30 },
  buttonStyled: {
    width: 50,
    height: 50,
    backgroundColor: transparent
  }
});
export default TopNavBar;
