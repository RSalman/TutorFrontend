import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyCode, setProgressBar } from '../actions/signup';
import StyledText from './StyledText';

const CODE_LENGTH = 4;

class PhoneVerificationInput extends Component {
  constructor(props) {
    super(props);
    this.state = { isCodeValid: false };
  }

  componentWillMount() {
    this.props.setProgressBar(0.5);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.verified)
      Actions.becomeATutor();
  }

  verify(code) {
    const valid = code && code.length === CODE_LENGTH;
    this.setState({ isCodeValid: valid });
    if (valid)
      this.props.verifyCode(code);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <StyledText style={styles.headerText}>{I18n.t('phoneVerification.enterCode')}</StyledText>
        </View>
        <TextInput
          style={styles.input}
          autoFocus
          onChangeText={(code) => this.verify(code)}
          disabled={this.props.verifying}
          maxLength={CODE_LENGTH}
          keyboardType="numeric"
        />
        <View style={styles.textContainer}>
          <StyledText style={styles.text}>
            {(!this.props.verifying && !this.props.verified && this.state.isCodeValid) ?
                I18n.t('phoneVerification.incorrectCode') : ''
            }
          </StyledText>
        </View>
      </View>
    );
  }
}

const failureTextColor = 'red';
const inputBorderColor = 'gray';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 60
  },
  headerContainer: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    alignSelf: 'center',
    height: 100,
    width: 230,
    fontSize: 85,
    padding: 5,
    textAlign: 'center',
    borderColor: inputBorderColor,
    borderWidth: 1
  },
  textContainer: {
    marginTop: 15,
    height: 100,
    width: null,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: failureTextColor
  }
});

const mapStateToProps = (state) => {
  return {
    verifying: state.signup.phoneVerifying,
    verified: state.signup.phoneVerified
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ verifyCode, setProgressBar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerificationInput);
