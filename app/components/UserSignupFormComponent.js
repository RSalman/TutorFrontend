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
    this.props.updateForm();
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
          onChange={(formData) => {this.props.updateForm(formData);}}
          value={this.props.signup_data}
        />
        <Button raised title="Next" onPress={(form) => {this.onPress(form);}} backgroundColor={green} />
      </View>
    );
  }
}

var Form = t.form.Form;

var User = t.struct({
  first_name: t.String,
  last_name: t.String,
  email: t.String,
  password: t.String,
  phone_number: t.Number
});

/* Define colours */
const green = '#61bd4f';
const grey = '#696969';

/* Define Form Stylesheet */
const stylesheet = _.cloneDeep(Form.stylesheet);
const font_size = 14;
const container_height = 30;

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.error.marginBottom = 5;

stylesheet.textbox.normal.fontSize = font_size;
stylesheet.textbox.error.fontSize = font_size;
stylesheet.controlLabel.normal.fontSize = font_size;
stylesheet.controlLabel.error.fontSize = font_size;
stylesheet.errorBlock.fontSize = font_size;

stylesheet.textbox.normal.height = container_height;
stylesheet.textbox.error.height = container_height;
stylesheet.textboxView.normal.height = container_height;
stylesheet.textboxView.error.height = container_height;

stylesheet.controlLabel.normal.color = grey;

var options = {
  stylesheet: stylesheet,
  fields: {
    email: { error: 'Please enter a valid email' },
    password: { secureTextEntry: true },
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

