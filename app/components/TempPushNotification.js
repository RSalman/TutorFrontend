import React, { Component } from 'react';
import { Platform, View, Alert } from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import StyledText from './StyledText';

export default class TempPushNotification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_created: false,
      app_token: 0,
      user_id: -1
    };
  }
  componentDidMount() {
    this.creatEntryOnServer();
  }

  showToken() {
    if (this.state.user_created) {
      return (
        <View>
          <StyledText>User has been added to backed DB with app token</StyledText>
          <StyledText>-------------------------------------------------------------------------</StyledText>
          <StyledText>{this.state.app_token}</StyledText>
          <StyledText>-------------------------------------------------------------------------</StyledText>
          <StyledText>User ID (Push Notifcation can be generated - see PR) </StyledText>
          <StyledText>id: {this.state.user_id}</StyledText>
        </View>
      );
    }
    return null;
  }

  creatEntryOnServer() {
    axios.post('/users', {
      user: {
        first_name: 'salman',
        last_name: 'Rana',
        email: 'sal@uottawa.ca',
        password: 'test1234',
        phone_number: '613-744-4536'
      }
    })
      .then(response => this.sendAppToken(response.data.id))
      .catch(function(error) {
        console.log(error);
      });
  }

  sendAppToken(id) {
    this.setState({ user_id: id });
    FCM.getFCMToken().then(token => {
      axios.post('/app_token', {
        id: id,
        token_data: {
          app_token: token,
          app_token_platform: 'Android'
        }
      })
      .then(this.setState({ user_created: true, app_token: token }))
      .catch(function(error) {
        console.log('Error Sending Token to the server!');
      });
    });
  }

  render() {
    return (
      <View>
        <StyledText>Temp Push Notification Component</StyledText>
        <StyledText>Please see PR for generting a tutor request!</StyledText>
        {this.showToken()}
      </View>
    );
  }
}

export function handleNotification(notif) {
  console.log('FCM Notification Event!');
  if (notif.type === 'request') {
    var data = JSON.parse(notif.associated_data);
    Alert.alert(
      'New Pending Request',
      data.tutee + ' has requested Tutoring for ' + data.course + '!',
      [
        { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        { text: 'Reject', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Accept', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  }
}


export function sendAppToken(id) {
    FCM.getFCMToken().then(token => {
      axios.post('/app_token', {
        id: id,
        token_data: {
          app_token: token,
          app_token_platform: 'Android'
        }
      })
      .catch(function(error) {
        console.log('Error Sending Token to the server!');
      });
    });
}