import React, { Component } from 'react';
import { Image, StyleSheet, View, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ButtonComponent from 'react-native-button-component';
import StyledText from './StyledText';



export default class HomeScreen extends Component {


  render() {
    return (
      <Image source={require('./img/background.jpg')} style={styles.backgroundImage}>
        <View style={styles.buttonsView}>
          <StyledText style={styles.logo}>PROSPR</StyledText>
          <ButtonComponent style={styles.button} text="Tutors Component (Sarmad)" onPress={Actions.tutors} />
          <ButtonComponent style={styles.button} text="Tutor Profile Component (Salman)" onPress={Actions.tutorinfo} />
          <ButtonComponent style={styles.button} text="Signup Form" onPress={Actions.signup} />
          <ButtonComponent style={styles.button} text="Leila's Feature" onPress={Actions.leila} />
          <ButtonComponent style={styles.button} text="Login" onPress={Actions.login} />
          <ButtonComponent style={styles.button} text="Temp Push Notification (Salman)" onPress={Actions.tempPushNotification} />
        </View>
      </Image>
    );
  }
}

const logoColor = '#008B8B';
const logoBackground = 'transparent';
const styles = StyleSheet.create({
  button: { marginTop: 10 },
  buttonsView: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  logo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    color: logoColor,
    fontSize: 60,
    marginTop: 10,
    backgroundColor: logoBackground,
  }
});
