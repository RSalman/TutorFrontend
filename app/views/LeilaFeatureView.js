import React, { Component } from 'react';
import { View } from 'react-native';
import {
    SideMenu,
    List,
    ListItem
} from 'react-native-elements';
import Homeview from './Homeview';


export default class LeilaFeatureView extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  toggleSideMenu(isHidden) {
    this.setState({
      isOpen: isHidden
    });
  }

  render() {
    const side = (
      <View>
        <List>
          <ListItem
            title="Profile"
            rightIcon={{ name: 'person-pin' }}
          />
          <ListItem
            title="score"
          />
          <ListItem
            title="Appointments"
          />
          <ListItem
            title="Sign out"
          />
        </List>
      </View>
    );
    return (
      <SideMenu
        isOpen={this.state.isOpen}
        menu={side}
      >
        <Homeview onPressFunct={this.toggleSideMenu} />

      </SideMenu>);
  }
}
