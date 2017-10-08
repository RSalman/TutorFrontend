import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ButtonComponent from 'react-native-button-component';
import StyledText from './StyledText';



export default class HomeScreen extends Component {

  render() {
    if (this.props.isTutor)
      Actions.tutor_home_screen();
    else
      Actions.student_home_screen();


    return (<View />);
  }
}

const logoColor = '#008B8B';
const logoBackground = 'transparent';
