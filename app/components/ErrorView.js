import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StyledText from './StyledText';

export default class ErrorView extends Component {
  render() {
    return (
      <View style={[styles.errorContainer, this.props.style]}>
        <Icon name="exclamation-triangle" size={30} color={this.props.color ? this.props.color : errorIconColor} />
        <StyledText style={[styles.errorText, { color: this.props.color ? this.props.color : errorTextColor }]}>{ this.props.error }</StyledText>
      </View>
    );
  }
}

const errorIconColor = '#ff7575';
const errorTextColor = '#ff7575';

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  errorText: {
    color: errorTextColor,
    fontSize: 15,
    textAlign: 'center'
  }
});
