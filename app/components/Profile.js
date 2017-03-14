import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import TopNavBar from './TopNavBar';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      fname: '',
      lname: '',
      rate: '',
      rating: '',
      email: '',
      telephone: ''
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal(fname, lname, rate, rating, email, telephone) {
    this.setState({
      fname: fname,
      lname: lname,
      rate: rate,
      rating: rating,
      email: email,
      telephone: telephone
    });
  }
  render() {
    const { toggled } = this.props;
    const { tabName } = this.props;
    const pendingRequests = [
      {
        id: 1,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: '3/5',
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 2,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: '3/5',
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 3,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: '3/5',
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 4,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: '3/5',
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 5,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: '3/5',
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 6,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: '3/5',
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 7,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: '3/5',
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 8,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: '3/5',
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 9,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: '3/5',
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 10,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: '3/5',
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      }
    ];
    return (
      <ScrollView style={style.container} >
        <TopNavBar toggled={toggled} tabName={tabName} />
        <View style={style.viewContainer} >
          <List>
            {
              pendingRequests.map((u) => (
                <ListItem
                  title={u.fname + ' ' + u.lname}
                  subtitle={u.course + ' | ' + u.rate + ' | ' + u.rating}
                  rightIcon={{ name:'textsms', size: 33, color: 'green' }}
                  key={u.id}
                  onPress={()=>{
                    Alert.alert(
                      'Confirmation',
                      'Lets confirm or cancel this request',
                      [
                        { text: 'Confirm' },
                        { text: 'Dismiss' }
                      ],
                      { cancelable: false }
                  );
                  }}
                />
              ))
            }
          </List>
        </View>
      </ScrollView>
    );
  }
}
const white = 'white';
const blue = '#8080ff';
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,

  },
  viewContainer: { backgroundColor: blue },
});
