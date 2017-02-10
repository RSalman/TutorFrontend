import ProgressBar from 'react-native-progress/Bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Platform, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import t from 'tcomb-form-native'

var Form = t.form.Form;

var User = t.struct({
  first_name: t.String,
  last_name: t.String,
  email: t.String,
  password: t.String,
  phone_number: t.Number
});

var options = {
  fields: {
    email: {
      error: 'Please insert a valid email'
    },
    password: {
      secureTextEntry: true
    },
    phone_number: {
      error: 'Please enter a valid phone number'
    }
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
      <ScrollView>
        <Text style={styles.header}>Sign up for Prospr</Text>
        <ProgressBar progress={0.3} width={320} style={styles.progressStyling} />
        <View style={styles.container}>
          <Form
            ref={(form) => { this.signup_form = form; }}
            type={User}
            options={options}
            onChange={this.onChange.bind(this)}
            value={this.state.value}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor="#99d9f4">
            <Text style={styles.buttonText}>Next</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

/* Define colours */
const light_blue = '#48BBEC';
const white = '#ffffff';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 10,
    backgroundColor: white,
  },
  buttonText: {
    fontSize: 18,
    color: white,
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: light_blue,
    borderColor: light_blue,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  header: {
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
    ...Platform.select({
      ios: {
        fontFamily: 'HelveticaNeue-Thin'
      },
      android: {
        fontFamily: 'sans-serif-thin'
      },
    })
  },
  progressStyling: {
    alignSelf: 'center',
    marginTop: 10
  }
});