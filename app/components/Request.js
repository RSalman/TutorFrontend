import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import Communications from 'react-native-communications';

import TopNavBar from './TopNavBar';

export default class Request extends Component {
  constructor() {
    super();

    // this.state = { datasource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(approvedRequests) };
  }
  render() {
    const { toggled } = this.props;
    const { tabName } = this.props;
    const approvedRequests = [
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
      <View style={style.container}>
        <TopNavBar toggled={toggled} tabName={tabName} />
        <ScrollView>
          <Text style={style.text}>{approvedRequests.length} approved requests</Text>
          <List containerStyle={style.list}>
            {
                approvedRequests.map((u) => (
                  <ListItem
                    key={u.id}
                    title={u.fname + ' ' + u.lname}
                    hideChevron
                    wrapperStyle={style.listItem}
                    label={
                      <View style={style.iconsView}>
                        <Icon
                          reverse
                          raised
                          name="textsms"
                          color={textIconColor}
                          size={18}
                          containerStyle={style.icon}
                          onPress={()=>{
                            Alert.alert(
                                          'Send a text',
                                          'Lets confirm or cancel this request',
                              [
                                {
                                  text: 'Confirm',
                                  onPress: () => Communications.text(u.telephone, 'this a sample text')
                                },
                                            { text: 'Cancel' }
                              ]
                                      );
                          }}
                        />
                        <Icon
                          reverse
                          raised
                          name="email"
                          color={emailIconColor}
                          size={18}
                          containerStyle={style.icon}
                          onPress={()=>{
                            Alert.alert(
                                            'Send a mail',
                                            'Lets confirm or cancel this request',
                              [
                                {
                                  text: 'Confirm',
                                  onPress: () => Communications.email()
                                },
                                                { text: 'Cancel' }
                              ],
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
const emailIconColor = '#00aced';
const textIconColor = '#517fa4';
const white = 'white';
const blue = '#8080ff';
const style = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1
  },
  list: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderBottomColor: white,
  },
  listItem: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom:0
  },
  icon: { width: 50 },
  iconsView: { flexDirection: 'row' },
  text: {
    marginTop:10,
    marginLeft: 25,
    color: blue,
    fontSize: 16
  }
});
