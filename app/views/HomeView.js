import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';

export default class HomeView extends Component {
  
  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.navigateToFeature.bind(this, "TutorsComponent")}>
          <Text>Tutors Component (Sarmad)</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.navigateToFeature.bind(this, "SalmanFeature")}>
          <Text>Salman's Feature</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.navigateToFeature.bind(this, "LeilaFeature")}>
          <Text>Leila's Feature</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.navigateToFeature.bind(this, "MuraadFeature")}>
          <Text>Muraad's Feature</Text>
        </TouchableHighlight>

      </View>
    )
  }

  navigateToFeature(feature) {
    this.props.navigator.push({ screen: feature });
  }
}