import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
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

const mapStateToProps = (state) => {
  return { tutorMode: state.session.tutorMode };
};

export default connect(mapStateToProps)(HomeScreen);
