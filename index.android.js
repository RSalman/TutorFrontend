'use strict';

import React, {
  Component,
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

var TutorFrontend = React.createClass({
 
    _onPressButtonGET: function() {
        fetch("http://10.0.3.2:3000/api/v1/users", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            alert(JSON.stringify(responseData))
        })
        .done();
    },
 
    _onPressButtonPOST: function() {
        fetch("http://10.0.3.2:3000/auth/sign_in", {method: "POST", body: JSON.stringify({email: "test", password: "test"})})
        .then((response) => response.json())
        .then((responseData) => {
            alert( JSON.stringify(responseData))
        })
        .done();
    },
 
    render: function() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Tutor App!
                </Text>
                <View style={styles.buttons}>
                    <TouchableHighlight onPress={this._onPressButtonGET} style={styles.button}>
                        <Text>GET Test</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._onPressButtonPOST} style={styles.button}>
                        <Text>POST Test</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    },
 
});
 
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    button: {
        backgroundColor: '#eeeeee',
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
    },
     welcome: {
     fontSize: 40,
     textAlign: 'center',
     margin: 30,
  }
});
 
AppRegistry.registerComponent('TutorFrontend', () => TutorFrontend);