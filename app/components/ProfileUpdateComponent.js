import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import StyledText from './StyledText';
import { fetchProfile, updateProfile } from '../actions/profileupdate';
import { Akira } from 'react-native-textinput-effects';
import ErrorView from './ErrorView';


class ProfileUpdateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      courseList: '',
      rate: '',
      education: '',
      tutor_description: '',
      first_name: '',
      last_name: '',
      phone_number: ''
    };
  }

  componentWillMount() {
    this.props.fetchProfile(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
      this.state = nextProps.tutor_data;
  }

  uploadProfilePicture() {
    ImagePicker.showImagePicker(null, (response) => {
      if (response.didCancel) {
        // Do nothing
      }
      else if (response.error) {
        // TODO(Muraad): handle error
      }
      else {
        var source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          image: source
        });
      }
    });
  }

  renderProfilePicture() {
    if(this.state.image) 
      return (
          <Image source={this.state.image} style={styles.profilePicture} resizeMode="contain" />
          );
    else
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
      <Text style={styles.buttonText}>Update Profile</Text>
    );
  }

    render() {
    return (
      <Image source={require('./img/login1_bg.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.profilePictureWrap}>
              <View style={styles.iconWrap}>
              { this.renderProfilePicture() }
              </View>
              <View style={styles.profileButton}>
              <Button
                raised
                icon={{name: 'file-upload'}}
                title='Upload Profile Picture' 
                onPress={() => this.uploadProfilePicture()}/>
                </View>
            </View>



            <View style={styles.inputWrap}>
              
            <TextInput
                placeholderTextColor={grey}
                placeholder="First Name"
                underlineColorAndroid={transparent}
                style={styles.input}
                defaultValue = {this.state.first_name}
                onChangeText={(first_name) => this.setState({first_name})}
              />
            </View>


            <View style={styles.inputWrap}>        
            <TextInput
                placeholderTextColor={grey}
                placeholder="Last Name"
                underlineColorAndroid={transparent}
                style={styles.input}
                defaultValue = {this.state.last_name}
                onChangeText={(last_name) => this.setState({last_name})}
              />
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                placeholderTextColor={grey}
                placeholder="Phone Number"
                underlineColorAndroid={transparent}
                style={styles.input}
                defaultValue = {this.state.phone_number }
                onChangeText={(phone_number) => this.setState({phone_number})}
              />
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
                defaultValue = {this.state.courseList == '' ? '' : this.state.courseList.join() }
                onChangeText={(courses) => this.setState({courseList: courses.split(',')})}
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
                keyboardType = 'numeric'
                style={styles.input}
                defaultValue = {this.state.rate}
                onChangeText={(rate) => this.setState({rate})}
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={capIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <Picker
                style={styles.input}
                selectedValue={this.state.education}
                onValueChange={(education) => this.setState({education})}>
                <Picker.Item label="High School Diploma" value="Highschool" />
                <Picker.Item label="Bachelors" value="Bachelors" />
                <Picker.Item label="Masters" value="Masters" />
                <Picker.Item label="PHD" value="PHD" />
              </Picker>
            </View>
            <View style={styles.inputWrap}>
            <TextInput
              multiline={true}
              underlineColorAndroid={transparent}
              placeholder="Brief Bio"
              defaultValue = {this.state.tutor_description}
              onChangeText={(tutor_description) => this.setState({tutor_description})}
              style={styles.textarea} />
              </View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.updateProfile(this.state, this.props.id)}>
              <View style={styles.button}>
                { this.renderButtonContent() }
              </View>
            </TouchableOpacity>
          </View>
          { this.renderErrorView() }
        </View>
        </Image>
    );
  }
}

const { width, height } = Dimensions.get('window');
const background = require('./img/login1_bg.png');
const mark = require('./img/login1_mark.png');
const lockIcon = require('./img/login1_lock.png');
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

const options = {
  title: 'Select Profile Picture',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

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
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: white
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
  },
    backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
});

const mapStateToProps = (state) => {
  return { tutor_data: state.profileupdate.tutor_data };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchProfile, updateProfile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdateComponent);