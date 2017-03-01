import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { SideMenu, List, ListItem } from 'react-native-elements';
import Homeview from './Homeview';


export default class LeilaFeatureView extends Component {
  constructor() {
    super();
    this.state = { isOpen: false };
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  toggleSideMenu() {
    //this can be set to true instead of !isOpen because when the sidemenu is clicked to hide, isOpen is made false
    this.setState({ isOpen: true });
  }

  render() {
    const side = (
      <View style={style.main}>
        <View style={style.topView}>
          <Image
            style={style.image}
            source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
          />
          <Text>Jane Doe</Text>
        </View>
        <View style={style.middleView}>
          <List>
            <ListItem
              title="Profile"
              rightIcon={{ name: 'person-pin' }}
            />
            <ListItem
              title="Appointments"
              rightIcon={{ name: 'watch-later' }}
            />
            <ListItem
              title="Payments"
              rightIcon={{ name: 'payment' }}
            />
            <ListItem
              title="Help"
              rightIcon={{ name: 'live-help' }}
            />
            <ListItem
              title="Sign out"
            />
          </List>
        </View>
        <View style={style.bottomView}>
          <Text>Terms and conditions of use</Text>
        </View>
      </View>
    );
    return (
      <SideMenu
        isOpen={this.state.isOpen}
        menu={side}
      >
        <Homeview toggled={this.toggleSideMenu.bind(this)} />
      </SideMenu>);
  }
}

const style = StyleSheet.create({
  main: { flex: 1 },
  topView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  middleView: { flex: 3 },
  bottomView: { flex: 1 },
  image: { width: 50, height: 50, borderRadius: 20 }
});

