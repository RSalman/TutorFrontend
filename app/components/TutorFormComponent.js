import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { submitForm, setProgressBar } from '../actions/signup';
import ErrorView from './ErrorView';
import { setTutorMode } from '../actions/session';

class TutorFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      courseList: '',
      rate: '',
      education: '',
      tutor_description: ''
    };
  }

  componentWillMount() {
    this.props.setProgressBar(0.90);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.successfulSubmission) {
      this.props.setTutorMode();
      Actions.side_menu({ type: 'reset', user_data: nextProps.user_data });
    }
  }

  uploadProfilePicture() {
    ImagePicker.showImagePicker(null, (response) => {
      if (response.didCancel) {
        // Do nothing
      } else if (response.error) {
        // TODO(Muraad): handle error
      } else {
        var source = 'data:image/jpeg;base64,' + response.data;
        this.setState({ image: source });
      }
    });
  }

  renderProfilePicture() {
    if (this.state.image) {
      return (
        <Image source={{ uri: this.state.image }} style={styles.profilePicture} resizeMode="contain" />
      );
    }
    return (
      <Image source={personIcon} style={styles.icon} resizeMode="contain" />
    );
  }

  renderErrorView() {
    if (this.props.error) {
      return (
        <ErrorView error={this.props.error} color={brightRed} />
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
      <Text style={styles.buttonText}>Submit</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.profilePictureWrap}>
            <View style={styles.iconWrap}>
              { this.renderProfilePicture() }
            </View>
            <View style={styles.profileButton}>
              <Button
                raised
                icon={{ name: 'file-upload' }}
                title="Upload Profile Picture"
                onPress={() => this.uploadProfilePicture()}/>
            </View>
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image source={bookIcon} style={styles.icon} resizeMode="contain" />
            </View>
            <TextInput
              placeholderTextColor={grey}
              placeholder="Courses To Tutor"
              underlineColorAndroid={transparent}
              style={styles.input}
              onChangeText={(courses) => this.setState({ courseList: courses.split(',') })}
              />
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image source={dollarIcon} style={styles.icon} resizeMode="contain" />
            </View>
            <TextInput
              placeholderTextColor={grey}
              placeholder="Hourly Rate"
              underlineColorAndroid={transparent}
              keyboardType = "numeric"
              style={styles.input}
              onChangeText={(rate) => this.setState({ rate })}
              />
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image source={capIcon} style={styles.icon} resizeMode="contain" />
            </View>
            <ModalDropdown
              options={['High School Diploma', 'Bachelors', 'Masters', 'PHD']}
              animated={false}
              textStyle={styles.pickerTextStyle}
              dropdownStyle={styles.pickerStyle}
              dropdownTextStyle={styles.pickerItemStyle}
              defaultValue="Education"
              onSelect={(index, education) => this.setState({ education })}
              />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              multiline={true}
              underlineColorAndroid={transparent}
              placeholder="Brief Bio"
              onChangeText={(tutor_description) => this.setState({ tutor_description })}
              style={styles.textarea} />
          </View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.submitForm(this.props.signup_data, this.state)}>
            <View style={styles.button}>
              { this.renderButtonContent() }
            </View>
          </TouchableOpacity>
        </View>
        { this.renderErrorView() }
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
const personIcon = require('./img/login1_person.png');
const dollarIcon = require('./img/dollar-3-16.png');
const capIcon = require('./img/graduation-cap-16.png');
const bookIcon = require('./img/book-16-16.png');

const grey = '#D3D3D3';
const lightGrey = '#D8D8D8';
const transparent = 'transparent';
const white = '#FFF';
const darkGrey = '#CCC';
const buttonColor = '#FF3366';
const brightRed = '#ff7575';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,
    padding: 0,
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
  profilePictureWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
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
  pickerStyle: { backgroundColor: 'transparent' },
  pickerTextStyle: {
    backgroundColor: 'transparent',
    fontSize: 18,
    paddingLeft: 10,
    color: 'lightgrey',
  },
  pickerItemStyle: {
    backgroundColor: '#4d4d4d',
    fontSize: 18,
    color: white,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: white,
  },
  profileButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  profilePicture: {
    height: 60,
    width: 60
  },
  button: {
    backgroundColor: buttonColor,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
  spinner: { height: 18 },
  textarea: {
    backgroundColor: lightGrey,
    flex: 1,
  }
});

const mapStateToProps = (state) => {
  return {
    successfulSubmission: state.signup.successfulSubmission,
    tutor_data: state.signup.tutor_data,
    signup_data: state.signup.signup_data,
    error: state.signup.error,
    isLoading: state.signup.isLoading,
    isTutor: state.signup.isTutor,
    user_data: state.signup.user_data
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ submitForm, setProgressBar, setTutorMode }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TutorFormComponent);
