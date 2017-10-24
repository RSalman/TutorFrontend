import React, { Component } from 'react';
import { Platform, Text, StyleSheet } from 'react-native';

export default class StyledText extends Component {
  render() {
    return (
      <Text style={[styles.text, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

const transparentColor = 'transparent';
const styles = StyleSheet.create({
  text: {
    backgroundColor: transparentColor,
    ...Platform.select({
      ios: { fontFamily: 'HelveticaNeue-Thin' },
      android: { fontFamily: 'sans-serif-light' },
    })
  }
});
