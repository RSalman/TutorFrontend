import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
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

  render() {
    return (
      <View>
      <StyledText>Temp Push Notification Component</StyledText> 
      {this.showToken()}
      </View>
    );
  }

  showToken(){
    if(this.state.user_created)
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
    else
      return null;
  }

  creatEntryOnServer(){
      axios.post('/users', {
        user: {
         first_name: this.makeid(5),
         last_name: this.makeid(5),
         email: this.makeid(10) + "@uottawa.ca",
         password: this.makeid(15),
         phone_number: this.makePhoneNumber()
        }
      })
      .then(response => this.sendAppToken(response.data.id))
      .catch(function (error) {
        console.log(error);
      });    
  }

sendAppToken(id){       
  this.setState({ user_id: id});
  FCM.getFCMToken().then(token => {    
      axios.post('/app_token', {
      id: id,
      token_data: {
        app_token: token,
        app_token_platform: "Android"
        }
      })
      .then(this.setState({ user_created: true, app_token: token}))
      .catch(function (error) {
        console.log("Error Sending Token to the server!");
      });    
  });
}

  makeid(len)
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      for( var i=0; i < len; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }

  makePhoneNumber(len)
  {
      return Math.random() * (9999999999 - 1000000000) + 1000000000;
  }
}