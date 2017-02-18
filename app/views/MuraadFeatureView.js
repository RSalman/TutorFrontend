import ProgressBar from 'react-native-progress/Bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import t from 'tcomb-form-native';
import _ from 'lodash';
import { Button } from 'react-native-elements';

var Form = t.form.Form;

var User = t.struct({
  first_name: t.String,
  last_name: t.String,
  email: t.String,
  password: t.String,
  phone_number: t.Number
});

var options = {
  stylesheet: stylesheet,
  fields: {
    email: { error: 'Please enter a valid email' },
    password: { secureTextEntry: true },
    phone_number: { error: 'Please enter a valid phone number' }
  }
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
      }
    };
  }

  onChange(value) {
    this.setState({ value });
  }

  onPress() {
    // call getValue() to get the values of the form
    var value = this.signup_form.getValue();
    if (value)  // if validation fails, value will be null
      /* this is where to handle form data -MH */
      Actions.home();

  }

  render() {
    return (
      <Image source={require('../components/img/signup_background.png')} style={styles.backgroundImage}>
        <ScrollView>
          <Text style={styles.header}>Sign up for Prospr</Text>
          <ProgressBar progress={0.3} width={320} style={styles.progressStyling} color={green} />
          <View style={styles.container}>
            <Form
              ref={(form) => { this.signup_form = form; }}
              type={User}
              options={options}
              onChange={this.onChange.bind(this)}
              value={this.state.value}
            />
            <Button raised title="Next" onPress={(form) => {this.onPress(form);}} backgroundColor={green} />
          </View>
        </ScrollView>
      </Image>
    );
  }
}

/* Define colours */
const green = '#61bd4f';
const grey = '#bdc6cf';

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

/* Define Stylesheet For Entire Component */
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 10,
    marginLeft: 15,
    marginRight: 15

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
