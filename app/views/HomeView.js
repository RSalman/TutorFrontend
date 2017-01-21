import React, { Component, PropTypes } from 'react';
import { StyleSheet,View, Text, TouchableHighlight, Alert, Button } from 'react-native';

export default class HomeView extends Component {
  
  render() {
    return (
      <View>
        <Button title="Tutors Component (Sarmad)" onPress={this.navigateToFeature.bind(this, "TutorsComponent")}/>
        <Button title="Salman's Feature" onPress={this.navigateToFeature.bind(this, "SalmanFeature")}/>
        <Button title="Muraad's Feature" onPress={this.navigateToFeature.bind(this, "MuraadFeature")}/>
        <Button title="Leila's Feature" onPress={this.navigateToFeature.bind(this, "LeilaFeature")}/>        
      </View>
    )
  }

  navigateToFeature(feature) {
    this.props.navigator.push({ screen: feature });
  }
}