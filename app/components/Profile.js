import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

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
        rating: 3,
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 2,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: 3,
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 3,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: 3,
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 4,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: 3,
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 5,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: 3,
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 6,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: 3,
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 7,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: 3,
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 8,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: 3,
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 9,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: 3,
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      },
      {
        id: 10,
        fname: 'Leila',
        lname: 'Compaore',
        rate: '20$',
        rating: 3 / 5,
        course: 'adm1100',
        email: 'email@example.com',
        telephone: '1234567890'
      }
    ];
    return (
      <View style={style.container}>
        <TopNavBar toggled={toggled} tabName={tabName} />
        <ScrollView>
          <Text style={style.text}>You have {pendingRequests.length} requests waiting</Text>
          <List containerStyle={style.list}>
            {
                pendingRequests.map((u) => (
                  <ListItem
                    title={u.fname + ' ' + u.lname}
                    titleStyle={style.title}
                    wrapperStyle={style.listItem}
                    hideChevron
                    subtitle={u.course + ' | ' + u.rate}
                    key={u.id}
                    label={
                      <View>
                        <StarRating
                          maxStars={5}
                          rating={u.rating}
                          starSize={10}
                          starColor={'gold'}
                        />
                        <Icon
                          reverse
                          raised
                          name="details"
                          color="orange"
                          size={18}
                          containerStyle={style.icon}
                          onPress={()=>{
                            Alert.alert(
                                  'Accept the request',
                                  'Lets confirm or cancel this request',
                              [
                                    { text: 'Confirm' },
                                    { text: 'Refuse' },
                                    { text: 'Cancel' }
                              ],
                                  { cancelable: false }
                              );
                          }}
                        />
                      </View>
                        }
                  />
                ))
              }
          </List>
        </ScrollView>
      </View>
    );
  }
}

const white = 'white';
const blue = '#8080ff';
const black = 'black';
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  list: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderBottomColor: white,
  },
  text: {
    marginTop:10,
    marginLeft: 25,
    color: blue,
    fontSize: 16
  },
  listItem: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom:0
  },
  title:{ color: black, fontSize: 14 },
  icon: { width: 50 }
});
