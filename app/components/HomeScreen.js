import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ButtonComponent from 'react-native-button-component';
import StyledText from './StyledText';
import { connect } from 'react-redux';


class HomeScreen extends Component {

  render() {
    if (this.props.tutorMode)
      Actions.tutor_home_screen();
    else
      Actions.student_home_screen();


    return (<View />);
  }
}

const logoColor = '#008B8B';
const logoBackground = 'transparent';

const mapStateToProps = (state) => {
  return {
    tutorMode: state.session.tutorMode
  };
};

export default connect(mapStateToProps)(HomeScreen);
