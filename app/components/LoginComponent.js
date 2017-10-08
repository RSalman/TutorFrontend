import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FCM, { FCMEvent } from 'react-native-fcm';
import { authenticate, updateEmail, updatePassword } from '../actions/login';
import ErrorView from './ErrorView';
import { handleNotification } from './TempPushNotification';

class LoginComponent extends Component {

  componentDidMount() {
    //Temp(Salman): This should be done once the User has logged in
    //Register event handler to handle push notifications from any screen
    if (Platform.OS === 'android') {
      this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        handleNotification(notif);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.successful_authentication)
      Actions.side_menu({ isTutor: nextProps.isTutor, type: 'reset' });
  }

  renderErrorView() {
    if (this.props.error) {
      return (
        <ErrorView error={this.props.error} />
      );
    }
  }

  renderButtonContent() {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator
          animating
          style={styles.spinner}
          size="large"
          color={white}
        />
      );
    }
    return (
      <Text style={styles.buttonText}>Sign In</Text>
    );
  }

  render() {
    return (
      <Image source={background} style={styles.background} resizeMode="cover">
        <View style={styles.container}>
          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                value={this.props.email}
                placeholder="Email"
                placeholderTextColor={grey}
                underlineColorAndroid={transparent}
                style={styles.input}
                onChangeText={(email) => this.props.updateEmail(email)}
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                value={this.props.password}
                placeholderTextColor={grey}
                placeholder="Password"
                underlineColorAndroid={transparent}
                style={styles.input}
                onChangeText={(password) => this.props.updatePassword(password)}
                secureTextEntry
              />
            </View>
            <TouchableOpacity activeOpacity={0.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.authenticate(this.props.email, this.props.password)}>
              <View style={styles.button}>
                { this.renderButtonContent() }
              </View>
            </TouchableOpacity>
          </View>
          { this.renderErrorView() }
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Don&apos;t have an account?</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={Actions.signup}>
                <View>
                  <Text style={styles.signupLinkText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Image>
    );
  }
}

const { width, height } = Dimensions.get('window');
const background = require('./img/login1_bg.png');
const mark = require('./img/login1_mark.png');
const lockIcon = require('./img/login1_lock.png');
const personIcon = require('./img/login1_person.png');

const grey = '#D3D3D3';
const lightGrey = '#D8D8D8';
const transparent = 'transparent';
const white = '#FFF';
const darkGrey = '#CCC';
const buttonColor = '#FF3366';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,
    padding: 10,
    marginLeft: 15,
    marginRight: 15
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: { paddingVertical: 30 },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: darkGrey
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: white
  },
  button: {
    backgroundColor: buttonColor,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: white,
    fontSize: 18,
  },
  forgotPasswordText: {
    color: lightGrey,
    backgroundColor: transparent,
    textAlign: 'right',
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: transparent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: { color: lightGrey },
  signupLinkText: {
    color: white,
    marginLeft: 5,
  },
  spinner: { height: 18 }
});

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    password: state.login.password,
    successful_authentication: state.login.successful_authentication,
    error: state.login.error,
    isLoading: state.login.isLoading,
    isTutor: state.login.isTutor,
    user_data: state.login.user_data
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ authenticate, updateEmail, updatePassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
