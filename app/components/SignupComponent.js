import ProgressBar from 'react-native-progress/Bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView, Image } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import PhoneVerificationInput from './PhoneVerificationInput';

const form_page = {
  USER_FORM: 0,
  PHONE_VERIFICATION: 1,
  TUTOR_FORM: 2
};
export default class MuraadFeatureView extends Component {
  constructor(props) {
    super(props);
    /* define initial state */
    this.state = {
      value: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: ''
      },
      current_page: form_page.USER_FORM,
      progress_status: 0.3
    };
  }

  onChange(value) {
    this.setState({ value });
  }

  onPress() {
    this.setState({ current_page: form_page.PHONE_VERIFICATION, progress_status: 0.6 });
  }

  _renderForm() {
  	if (this.state.current_page === form_page.USER_FORM) {
  		return (
    <View style={styles.container}>
      <FormLabel>First Name</FormLabel>
      <FormInput placeholder={I18n.t('signupComponent.first_name_placeholder')} />

      <FormLabel>Last Name</FormLabel>
      <FormInput placeholder={I18n.t('signupComponent.last_name_placeholder')} />

      <FormLabel>Email</FormLabel>
      <FormInput placeholder={I18n.t('signupComponent.email_placeholder')} />

      <FormLabel>Password</FormLabel>
      <FormInput secureTextEntry placeholder={I18n.t('signupComponent.password_placeholder')} />

      <FormLabel>Phone Number</FormLabel>
      <FormInput keyboardType="phone-pad" placeholder={I18n.t('signupComponent.phone_number_placeholder')} />
      <Button raised title="Next" onPress={(form) => {this.onPress(form);}} backgroundColor={green} />
    </View>
  );
  } else if (this.state.current_page === form_page.PHONE_VERIFICATION) {
    return (<PhoneVerificationInput />);
  } else if (this.state.current_page === form_page.TUTOR_FORM) {
  		/* TODO - MURAAD HARED */
  	}
  }

  render() {
    return (
      <Image source={require('./img/signup_background.png')} style={styles.backgroundImage}>
        <ScrollView>
          <Text style={styles.header}>Sign up for Prospr</Text>
          <ProgressBar progress={this.state.progress_status} width={320} style={styles.progressStyling} color={green} />
          {this._renderForm()}
        </ScrollView>
      </Image>
    );
  }
}

/* Define colours */
const light_blue = '#48BBEC';
const green = '#61bd4f';
const white = '#ffffff';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 10
  },
  header: {
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
    ...Platform.select({
      ios: { fontFamily: 'HelveticaNeue-Thin' },
      android: { fontFamily: 'sans-serif-thin' },
    })
  },
  progressStyling: {
    alignSelf: 'center',
    marginTop: 10
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
});
