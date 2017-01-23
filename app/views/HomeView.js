import React, { Component } from 'react';
import { Button, View } from 'react-native';

export default class HomeView extends Component {
  navigateToFeature(feature) {
    this.props.navigator.push({ screen: feature });
  }

  render() {
    return (
      <View>
        <Button title="Tutors Component (Sarmad)" onPress={this.navigateToFeature.bind(this, 'TutorsComponent')} />
        <Button title="Salman's Feature" onPress={this.navigateToFeature.bind(this, 'SalmanFeature')} />
        <Button title="Muraad's Feature" onPress={this.navigateToFeature.bind(this, 'MuraadFeature')} />
        <Button title="Leila's Feature" onPress={this.navigateToFeature.bind(this, 'LeilaFeature')} />
      </View>
    );
  }
}
