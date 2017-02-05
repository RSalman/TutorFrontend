import React, { Component } from 'react';
import { Text, Image, Platform, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ButtonComponent from 'react-native-button-component';

export default class HomeScreen extends Component {
  render() {
    return (
      <Image source={require('./img/background.jpg')} style={styles.backgroundImage}>
        <View style={styles.buttonsView}>
          <Text style={styles.logo}>PROSPR</Text>
          <ButtonComponent style={styles.button} text="Tutors Component (Sarmad)" onPress={Actions.tutors} />
          <ButtonComponent style={styles.button} text="Tutor Profile Component (Salman)" onPress={Actions.tutorinfo} />
          <ButtonComponent style={styles.button} text="Muraad's Feature" onPress={Actions.muraad} />
          <ButtonComponent style={styles.button} text="Leila's Feature" onPress={Actions.leila} />
          <ButtonComponent style={styles.button} text="Phone Verification (Sarmad)" onPress={Actions.phoneVerification} />
        </View>
      </Image>
    );
  }
}

const logoColor = '#008B8B';
const logoBackground = 'transparent';
const styles = StyleSheet.create({
<<<<<<< 6d12072992b182301b1f4704e2fee57db43d4f00
  button: { marginTop: 10 },
=======
  button: {
    marginTop: 10
  },
>>>>>>> Create an actual home screen with styled buttons and background image
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
    ...Platform.select({
<<<<<<< 6d12072992b182301b1f4704e2fee57db43d4f00
      ios: { fontFamily: 'HelveticaNeue-Thin' },
      android: { fontFamily: 'sans-serif-thin' },
=======
      ios: {
        fontFamily: 'HelveticaNeue-Thin'
      },
      android: {
        fontFamily: 'sans-serif-thin'
      },
>>>>>>> Create an actual home screen with styled buttons and background image
    })
  }
});
