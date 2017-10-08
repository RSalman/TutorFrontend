import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { SideMenu, List, ListItem } from 'react-native-elements';
import { DefaultRenderer, Actions } from 'react-native-router-flux';

export default class SideMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleSideMenu() {
    //this can be set to true instead of !isOpen because when the sidemenu is clicked to hide, isOpen is made false
    this.setState({ isOpen: true });
  }

  render() {
  	const children = this.props.navigationState.children;
    const state = children[children.length - 1];
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
              onPress={() => Actions.tutorinfo({ id: this.props.user_data.id, demoProfile: true})}
              title="View Profile"
              rightIcon={{ name: 'person-pin' }}
            />
            <ListItem
              onPress={() => Actions.profileupdate({id: this.props.user_data.id})}
              title="Edit Profile"
              rightIcon={{ name: 'brush' }}
            />
            <ListItem
              title={I18n.t('sideMenu.profile')}
              rightIcon={{ name: 'person-pin' }}
            />
            <ListItem
              title={I18n.t('sideMenu.help')}
              rightIcon={{ name: 'live-help' }}
            />
            <ListItem
              title="Your Requests"
              rightIcon={{ name: 'live-help' }}
              onPress={() => Actions.tutor_home_screen()}
            />
            <ListItem
              title={I18n.t('sideMenu.signOut')}
              onPress={() => Actions.login({ type: 'reset' })}
            />
          </List>
        </View>
        <View style={style.bottomView}>
          <Text>{I18n.t('sideMenu.termsConditions')}</Text>
        </View>
      </View>
    );

    return (
      <SideMenu
        isOpen={this.state.isOpen}
        menu={side}
      >
        <DefaultRenderer
          navigationState={state}
          key={state.key}
          {...state}
          onNavigate={this.props.onNavigate}
        />
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
