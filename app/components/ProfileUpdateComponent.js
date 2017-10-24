import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Madoka } from 'react-native-textinput-effects';
import { fetchProfile, updateProfile } from '../actions/profileupdate';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

const educationMap = {
  'High School Diploma': 0,
  'Bachelors': 1,
  'Masters': 2,
  'PHD': 3,
};

class ProfileUpdateComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        image: '',
        courseList: '',
        rate: '',
        education: '',
        tutor_description: '',
        first_name: '',
        last_name: '',
        phone_number: ''
      },
      viewTutorForm: false
    };
  }

  componentWillMount() {
    this.props.fetchProfile(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tutor_data !== nextProps.tutor_data)
      this.setState({ formData: nextProps.tutor_data });
  }

  uploadProfilePicture() {
    ImagePicker.showImagePicker(null, (response) => {
      if (response.didCancel) {
        // Do nothing
      } else if (response.error) {
        // TODO(Muraad): handle error
      } else {
        var source = 'data:image/jpeg;base64,' + response.data;
        this.setState({ formData: { ...this.state.formData, image: source } });
      }
    });
  }

  renderProfilePicture() {
    if (this.state.formData.image) {
      return (
        <Image source={{ uri: this.state.formData.image }} style={styles.profilePicture} resizeMode="contain" />
      );
    }
    return (
      <Image source={personIcon} style={styles.icon} resizeMode="contain" />
    );
  }

  renderMessageView() {
    if (this.props.error) {
      return (
        <Text style={styles.titleCardError}>{this.props.message}</Text>
      );
    } else if (this.props.success) {
      return (
        <Text style={styles.titleCardSuccess}>{this.props.message}</Text>
      );
    }
  }

  renderFormContents() {
    if (this.state.viewTutorForm) {
      console.log(this.props.educationMap);
      return (
        <View>
          <Madoka
            style={styles.inputCard}
            label={'Courses'}
            value = {this.state.formData.courseList ? this.state.formData.courseList.join() : '' }
            onChangeText={(courses) => this.setState({ formData: { ...this.state.formData, courseList: courses.split(',') } })}
            borderColor={madokaBorderColor}
            labelStyle={styles.MadokaLabelStyle}
            inputStyle={styles.MadokaInputStyle}
          />
          <View style={styles.content}>
            <Madoka
              style={styles.inputCardNames}
              label={'Rate'}
              borderColor={madokaBorderColor}
              labelStyle={styles.MadokaLabelStyle}
              inputStyle={styles.MadokaInputStyle}
              value = {this.state.formData.rate}
              onChangeText={(rate) => this.setState({ formData: { ...this.state.formData, rate } })}
            />
            <View style={styles.inputWrap}>
              <ModalDropdown
                options={['High School Diploma', 'Bachelors', 'Masters', 'PHD']}
                animated={false}
                defaultIndex={this.state.formData.education ? educationMap[this.state.formData.education] : -1}
                textStyle={styles.pickerTextStyle}
                dropdownStyle={styles.pickerStyle}
                dropdownTextStyle={styles.pickerItemStyle}
                defaultValue={this.state.formData.education ? this.state.formData.education : 'Education'}
                onSelect={(index, education) => this.setState({ formData:{ ...this.state.formData, education } })}
                />
            </View>
          </View>
          <View style={styles.inputWrapTutorBio}>
            <TextInput
              multiline={true}
              underlineColorAndroid={transparent}
              placeholder="Brief Bio"
              defaultValue = {this.state.formData.tutor_description}
              onChangeText={(tutor_description) => this.setState({ formData:{ ...this.state.formData, tutor_description } })}
              style={styles.textarea} />
          </View>
        </View>
      );
    }
    return (
      <View>
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
        <View style={styles.content}>
          <Madoka
            style={styles.inputCardNames}
            label={'First Name'}
            value = {this.state.formData.first_name}
            borderColor={madokaBorderColor}
            labelStyle={styles.MadokaLabelStyle}
            inputStyle={styles.MadokaInputStyle}
            onChangeText={(first_name) => this.setState({ formData: { ...this.state.formData, first_name } })}
          />
          <Madoka
            style={styles.inputCardNames}
            label={'Last Name'}
            value={this.state.formData.last_name}
            borderColor={madokaBorderColor}
            labelStyle={styles.MadokaLabelStyle}
            inputStyle={styles.MadokaInputStyle}
            onChangeText={(last_name) => this.setState({ formData: { ...this.state.formData, last_name } })}
          />
        </View>
        <Madoka
          style={styles.inputCard}
          label={'Number'}
          value = {this.state.formData.phone_number }
          borderColor={madokaBorderColor}
          labelStyle={styles.MadokaLabelStyle}
          inputStyle={styles.MadokaInputStyle}
          onChangeText={(phone_number) => this.setState({ formData: { ...this.state.formData, phone_number } })}
        />
      </View>
    );

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
            <View style={styles.card} >
              <Text style={styles.titleCard}>{this.props.becomeTutor ? 'Become a Tutor!' : 'Edit Your Profile!'}</Text>
              { this.renderMessageView() }
              <View style={styles.navButtons}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.setState({ viewTutorForm: !this.state.viewTutorForm })} >
                  <View style={!this.state.viewTutorForm ? styles.buttonNavSelected : styles.buttonNav }>
                    <Text style={styles.buttonTextx}>Personal</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.setState({ viewTutorForm: !this.state.viewTutorForm })} >
                  <View style={this.state.viewTutorForm ? styles.buttonNavSelected : styles.buttonNav }>
                    <Text style={styles.buttonTextx}>Tutor</Text>
                  </View>
                </TouchableOpacity>
              </View>
              { this.renderFormContents() }
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.updateProfile(this.state.formData, this.props.id)}>
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

const personIcon = require('./img/login1_person.png');

const lightGrey = '#ebebeb';
const transparent = 'transparent';
const white = '#FFF';
const darkGrey = '#404d5b';
const inputBox = '#437D64';
const brightRed = '#cd3232';
const brightGreen = '#5bd75b';
const formBackground = '#F9F7F6';
const madokaBorderColor = '#aee2c9';
const titleCardColor = '#404d5b';

const styles = StyleSheet.create({
  content:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  navButtons:{ flexDirection:'row' },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,
    padding: 0,
    marginLeft: 15,
    marginRight: 15
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
  },
  inputWrapTutorBio: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: inputBox
  },
  button: {
    backgroundColor: transparent,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderColor: white,
    borderWidth: 2,
    borderRadius: 200
  },
  buttonNavSelected: {
    backgroundColor: transparent,
    borderBottomWidth: 2,
    borderColor: madokaBorderColor
  },
  buttonNav: {
    backgroundColor: transparent,
    borderColor: madokaBorderColor
  },
  buttonText: {
    color: white,
    fontSize: 18
  },
  buttonTextx: {
    color: darkGrey,
    fontSize: 18,
    margin: 10,
    fontWeight: 'bold'
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
  card: {
    padding: 16,
    backgroundColor: formBackground
  },
  titleCard: {
    paddingBottom: 16,
    textAlign: 'center',
    color: titleCardColor,
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
    paddingBottom: 12,
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
  inputCard: { marginTop: 6 },
  MadokaLabelStyle: { color: inputBox },
  MadokaInputStyle: {
    color: darkGrey,
    fontSize: 15
  },
  profilePictureWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    height: 20,
    width: 20
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
  pickerStyle: { backgroundColor: 'transparent' },
  pickerTextStyle: {
    backgroundColor: 'transparent',
    fontSize: 18,
    paddingLeft: 10,
    color: darkGrey,
  },
  pickerItemStyle: {
    backgroundColor: '#4d4d4d',
    fontSize: 18,
    color: white,
  },
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
