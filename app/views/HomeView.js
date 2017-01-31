import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class HomeView extends Component {
  render() {
    return (
      <View>
        <Button title="Tutors Component (Sarmad)" onPress={Actions.tutors} />
        <Button title="Salman's Feature" onPress={Actions.tutorinfo} />
        <Button title="Muraad's Feature" onPress={Actions.muraad} />
        <Button title="Leila's Feature" onPress={Actions.leila} />
      </View>
    );
  }
}
