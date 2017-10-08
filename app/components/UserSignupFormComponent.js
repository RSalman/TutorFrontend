import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import t from 'tcomb-form-native';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { updateForm, setProgressBar } from '../actions/signup';

class UserSignupFormComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setProgressBar(0.25);
  }

  onPress() {
    var value = this.signup_form.getValue();
    if (value) {/* if validation fails, value will be null */
      Actions.phoneVerification();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={(form) => { this.signup_form = form; }}
          type={User}
          options={options}
          onChange={(formData) => this.props.updateForm(formData)}
          value={this.props.signup_data}
        />
        <Button raised title="Next" onPress={() => this.onPress()} backgroundColor={buttonColor} />
      </View>
    );
  }
}

var Form = t.form.Form;

var PhoneNumber = t.refinement(t.Number, function(number) {
  return number.toString().length === 10;
});

var ValidEmail = t.refinement(t.String, function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
});

var SecurePassword = t.refinement(t.String, function(password) {
  return password.length >= 6;
});

var User = t.struct({
  first_name: t.String,
  last_name: t.String,
  email: ValidEmail,
  password: SecurePassword,
  phone_number: PhoneNumber
});

/* Define colours */
const buttonColor = '#FF3366';
const lightGrey = '#D8D8D8';
const brightRed = '#ff7575';
const white = '#FFF';

/* Define Form Stylesheet */
const stylesheet = _.cloneDeep(Form.stylesheet);
const font_size = 14;
const container_height = 30;
const transparentColor = 'transparent';

stylesheet.textbox.normal.color = white;
stylesheet.textbox.error.color = white;
stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.error.marginBottom = 5;
stylesheet.textbox.normal.fontSize = font_size;
stylesheet.textbox.error.fontSize = font_size;
stylesheet.textbox.normal.height = container_height;
stylesheet.textbox.error.height = container_height;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.height = container_height;
stylesheet.textboxView.error.height = container_height;
stylesheet.textboxView.normal.borderColor = white;
stylesheet.textboxView.error.borderColor = brightRed;

stylesheet.controlLabel.normal.color = lightGrey;
stylesheet.controlLabel.error.color = brightRed;
stylesheet.controlLabel.normal.fontSize = font_size;
stylesheet.controlLabel.error.fontSize = font_size;
stylesheet.controlLabel.normal.backgroundColor = transparentColor;
stylesheet.controlLabel.error.backgroundColor = transparentColor;

stylesheet.errorBlock.fontSize = font_size;
stylesheet.errorBlock.color = brightRed;
stylesheet.errorBlock.backgroundColor = transparentColor;

var options = {
  stylesheet: stylesheet,
  fields: {
    email: { error: 'Please enter a valid email' },
    password: { error: 'Must be a minimum of 6 characters', secureTextEntry: true },
    phone_number: { error: 'Please enter a valid phone number' }
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 10,
    marginLeft: 15,
    marginRight: 15
  }
});

const mapStateToProps = (state) => {
  return {
    signup_data: state.signup.signup_data,
    form_page: state.signup.form_page,
    progress_status: state.signup.progress_status
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateForm, setProgressBar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserSignupFormComponent);
