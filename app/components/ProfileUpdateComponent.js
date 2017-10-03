import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import StyledText from './StyledText';
import { fetchProfile, updateProfile } from '../actions/profileupdate';
import { Madoka } from 'react-native-textinput-effects';
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

  renderMessageView() {
    if (this.props.error) {
      return (
        <Text style={styles.titleCardError}>{this.props.message}</Text>
      );
    } else if(this.props.success) {
      return (
        <Text style={styles.titleCardSuccess}>{this.props.message}</Text>
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
      <Image source={require('./img/editprofilebackground.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.wrapper}>

        <View style={[styles.card2, { backgroundColor: '#F9F7F6' }]} >
          <Text style={styles.titleCard}>Edit Your Profile!</Text>

          { this.renderMessageView() }


          <View style={styles.content}>

          <Madoka
            style={styles.inputCardNames}
            label={'First Name'}
            value = {this.state.first_name}
            borderColor={'#aee2c9'}
            labelStyle={{ color: inputBox }}
            inputStyle={{ color: darkGrey }}
            onChangeText={(first_name) => this.setState({first_name})}
          />
          <Madoka
            style={styles.inputCardNames}
            label={'Last Name'}
            value={this.state.last_name}
            borderColor={'#aee2c9'}
            labelStyle={{ color: inputBox }}
            inputStyle={{ color: darkGrey }}
            onChangeText={(last_name) => this.setState({last_name})}
          />

          </View>

          <Madoka
            style={styles.inputCard}
            label={'Number'}
            value = {this.state.phone_number }
            borderColor={'#aee2c9'}
            labelStyle={{ color: inputBox }}
            inputStyle={{ color: darkGrey }}
            onChangeText={(phone_number) => this.setState({phone_number})}
          />

          <Madoka
            style={styles.inputCard}
            label={'Courses'}
            value = {this.state.courseList == '' ? '' : this.state.courseList.join() }
            onChangeText={(courses) => this.setState({courseList: courses.split(',')})}
            borderColor={'#aee2c9'}
            labelStyle={{ color: inputBox }}
            inputStyle={{ color: darkGrey }}
          />


<View style={styles.content}>

          <Madoka
            style={styles.inputCardNames}
            label={'Rate'}
            borderColor={'#aee2c9'}
            labelStyle={{ color: inputBox }}
            inputStyle={{ color: darkGrey }}
            value = {this.state.rate}
            onChangeText={(rate) => this.setState({rate})}
          />



          
            <View style={styles.inputWrap}>
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

          </View>
 <View style={styles.inputWrap1}>
                      <TextInput
              multiline={true}
              underlineColorAndroid={transparent}
              placeholder="Brief Bio"
              defaultValue = {this.state.tutor_description}
              onChangeText={(tutor_description) => this.setState({tutor_description})}
              style={styles.textarea} />
              </View>


        </View>








            
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.updateProfile(this.state, this.props.id)}>
              <View style={styles.button}>
                { this.renderButtonContent() }
              </View>
            </TouchableOpacity>
          </View>
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
const lightGrey = '#ebebeb';
const transparent = 'transparent';
const white = '#FFF';
const darkGrey = '#404d5b';
const inputBox = '#437D64';
const buttonColor = '#FF3366';
const brightRed = '#cd3232';
const brightGreen = '#5bd75b';

const options = {
  title: 'Select Profile Picture',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const styles = StyleSheet.create({
  content:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',


    },
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
    marginVertical: 5,
    height: 25,
    borderBottomWidth: 1,
    borderBottomColor: inputBox, 
        marginLeft: 7,
        width: 165
  },
  input: {
    color: darkGrey,
    width: 165,
    height: 25,
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputWrap1: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: inputBox
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
    color: '#008445'
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
  },
  card2: {
    padding: 16,
  },
   titleCard: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
   titleCardError: {
    paddingBottom: 16,
    textAlign: 'center',
    color: brightRed,
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.8,
  },
   titleCardSuccess: {
    paddingBottom: 16,
    textAlign: 'center',
    color: brightGreen,
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.8,
  },
   inputCardNames: {
    marginTop: 6,
    marginLeft: 7,
    width: 165
  },
   inputCard: {
    marginTop: 6
  }
});

const mapStateToProps = (state) => {
  return { 
    tutor_data: state.profileupdate.tutor_data,
    isLoading:  state.profileupdate.isLoading,
    success: state.profileupdate.success,
    error: state.profileupdate.error,
    message: state.profileupdate.message
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchProfile, updateProfile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdateComponent);