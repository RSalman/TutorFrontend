import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import StyledText from './StyledText';
import { submitForm, setProgressBar } from '../actions/signup';

class BecomeATutorComponent extends Component {
  constructor(props) {
    super(props);
    this.props.setProgressBar(0.75);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.successfulSubmission)
      Actions.home({ type: 'reset' });
  }

  navigateToTutorForm() {
    /* TODO Navigate to tutor Form */
    /* for now, navigates to home page */
    Actions.home({ type: 'reset' });
  }

  render() {
    return (
      <View style={styles.container}>
        <StyledText style={styles.headerText}>Would you like to become a tutor?</StyledText>
        <View style={styles.buttonContainer}>
          <Button raised title="Yes" onPress={() => {this.props.submitForm(true);}} backgroundColor={green} />
          <Button raised title="No" onPress={() => {this.props.submitForm();}} backgroundColor={grey} />
        </View>
      </View>
    );
  }
}

/* Define colours */
const grey = '#bdc6cf';
const green = '#61bd4f';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 60,
    padding: 10,
    marginLeft: 15,
    marginRight: 15
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row'
  }
});

const mapStateToProps = (state) => {
  return {
    navigateToTutorForm: state.signup.navigateToTutorForm,
    successfulSubmission: state.signup.successfulSubmission
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ submitForm, setProgressBar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BecomeATutorComponent);
