import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Picker } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Madoka } from 'react-native-textinput-effects';
import { fetchProfile, updateProfile } from '../actions/profileupdate';

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
            <View style={styles.card} >
              <Text style={styles.titleCard}>Edit Your Profile!</Text>
              { this.renderMessageView() }
              <View style={styles.content}>
                <Madoka
                  style={styles.inputCardNames}
                  label={'First Name'}
                  value = {this.state.first_name}
                  borderColor={madokaBorderColor}
                  labelStyle={styles.MadokaLabelStyle}
                  inputStyle={styles.MadokaInputStyle}
                  onChangeText={(first_name) => this.setState({first_name})}
                />
                <Madoka
                  style={styles.inputCardNames}
                  label={'Last Name'}
                  value={this.state.last_name}
                  borderColor={madokaBorderColor}
                  labelStyle={styles.MadokaLabelStyle}
                  inputStyle={styles.MadokaInputStyle}
                  onChangeText={(last_name) => this.setState({last_name})}
                />
              </View>
              <Madoka
                style={styles.inputCard}
                label={'Number'}
                value = {this.state.phone_number }
                borderColor={madokaBorderColor}
                labelStyle={styles.MadokaLabelStyle}
                inputStyle={styles.MadokaInputStyle}
                onChangeText={(phone_number) => this.setState({phone_number})}
              />
              <Madoka
                style={styles.inputCard}
                label={'Courses'}
                value = {this.state.courseList == '' ? '' : this.state.courseList.join() }
                onChangeText={(courses) => this.setState({courseList: courses.split(',')})}
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
              <View style={styles.inputWrapTutorBio}>
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


const lightGrey = '#ebebeb';
const transparent = 'transparent';
const white = '#FFF';
const darkGrey = '#404d5b';
const inputBox = '#437D64';
const buttonColor = '#FF3366';
const brightRed = '#cd3232';
const brightGreen = '#5bd75b';
const formBackground = '#F9F7F6';
const formBackground = '#F9F7F6';
const madokaBorderColor = '#aee2c9';
const titleCardColor = '#404d5b';

const styles = StyleSheet.create({
  content:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
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
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputWrapTutorBio: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: inputBox
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
  },
  MadokaLabelStyle: {
     color: inputBox
  },
  MadokaInputStyle: {
    color: darkGrey
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