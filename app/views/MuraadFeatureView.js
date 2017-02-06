import ProgressBar from 'react-native-progress/Bar';
import React from 'react';
import t from 'tcomb-form-native';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Platform, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

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

var MuraadFeatureView = React.createClass({
	getInitialState() {
    return {
      value: {
        first_name: "",              
			  last_name: "",  
			  email: "",               
			  password: "",               
			  phone_number: ""  
      }
    };
  },
	 onChange(value) {
    this.setState({value});
  },

  onPress: function () {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
       /*fetch("http://10.0.3.2:3000/auth/sign_in", {method: "POST", body: JSON.stringify(value)})
         .then((response) => response.json())
         .then((responseData) => {
             alert( JSON.stringify(responseData));
             return (<Scene key="home" component={HomeView} title="HomeView" />);
         })
         .done();*/
         alert( JSON.stringify(value));
         Actions.home();
    }
  },

  render: function() {
    return (
    	<ScrollView>
    	<Text style={styles.header}>Sign up for Prospr</Text>
    	<ProgressBar progress={0.3} width={320} style = {styles.progressStyling}/>
      <View style={styles.container}>
        <Form
          ref="form"
          type={User}
          options={options}
          onChange={this.onChange}
          value = {this.state.value}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableHighlight>
      </View>
      </ScrollView> 
    );
  }
});

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
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

export default MuraadFeatureView;
/*
logo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    color: logoColor,
    fontSize: 60,
    marginTop: 10,
    ...Platform.select({
       ios: {
         fontFamily: 'HelveticaNeue-Thin'
       },
       android: {
         fontFamily: 'sans-serif-thin'
       },
     })
  }*/