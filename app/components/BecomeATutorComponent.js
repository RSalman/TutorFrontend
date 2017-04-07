import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import StyledText from './StyledText';
import { submitForm, setProgressBar } from '../actions/signup';
import ErrorView from './ErrorView';

class BecomeATutorComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setProgressBar(0.75);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.successfulSubmission)
      Actions.tutors({ type: 'reset' });
  }

  navigateToTutorForm() {
    Actions.tutorForm();
  }

  renderErrorView() {
    if (this.props.error) {
      return (
        <ErrorView error={this.props.error} color={brightRed} style={errorStyle} />
      );
    }
  }

  renderSpinner() {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator
          animating
          style={styles.spinner}
          size="large"
          color={buttonColor}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StyledText style={styles.headerText}>Would you like to become a tutor?</StyledText>
        <View style={styles.buttonContainer}>
          <Button raised title="Yes" onPress={() => this.navigateToTutorForm()} backgroundColor={buttonColor} />
          <Button raised title="No" onPress={() => this.props.submitForm(this.props.signup_data)} backgroundColor={grey} />
        </View>
        { this.renderErrorView() }
        <View style={styles.spinnerContainer}>
          { this.renderSpinner() }
        </View>
      </View>
    );
  }
}

/* Define colours */
const grey = '#bdc6cf';
const brightRed = '#ff7575';
const white = '#FFF';
const buttonColor = '#FF3366';

const errorStyle = { paddingTop: 80 };
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 60,
    padding: 10,
    marginLeft: 15,
    marginRight: 15
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    color: white
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row'
  },
  spinnerContainer: { paddingTop: 80 },
  spinner: { height: 18 }
});

const mapStateToProps = (state) => {
  return {
    successfulSubmission: state.signup.successfulSubmission,
    signup_data: state.signup.signup_data,
    error: state.signup.error,
    isLoading: state.signup.isLoading
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ submitForm, setProgressBar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BecomeATutorComponent);
