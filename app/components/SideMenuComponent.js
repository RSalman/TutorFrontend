import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { SideMenu, List, ListItem } from 'react-native-elements';
import { DefaultRenderer, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleSessionMode } from '../actions/session';
import { signOut } from '../actions/login';

class SideMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleSideMenu() {
    //this can be set to true instead of !isOpen because when the sidemenu is clicked to hide, isOpen is made false
    this.setState({ isOpen: true });
  }

  toggleSessionMode() {
    this.props.toggleSessionMode();
    Actions.home({ type: 'reset'});
  }

  signOut() {
    this.props.signOut();
    Actions.login({ type: 'reset' });
  }

  _renderTutorOptions() {
    var switchText = "Switch to Tutor Mode";
    if (this.props.tutorMode)
      switchText = "Switch to Student Mode";

    if (this.props.isTutor) {
      return (
        <View>
        { !this.props.tutorMode ? 
          <ListItem
              onPress={() => Actions.student_home_screen()}
              title="Search for Tutors"
              leftIcon={{ name: 'account-search', type: 'material-community'}}
            />
          : null }
         <ListItem
              onPress={() => Actions.tutorinfo({ id: this.props.userData.id, demoProfile: true})}
              title="View Profile"
              leftIcon={{ name: 'account', type: 'material-community'}}
            />
            <ListItem
              onPress={() => Actions.profileupdate({id: this.props.userData.id})}
              title="Edit Profile"
              leftIcon={{ name: 'edit' }}
            />
        <ListItem title= {switchText} 
          leftIcon={{ name: 'account-switch', type: 'material-community' }} 
          onPress={() => this.toggleSessionMode()} />
          </View>
      );
    } else {
      return (
      <ListItem title="Become a Tutor"  
        leftIcon={{ name: 'account-multiple-plus', type: 'material-community' }} 
        onPress={() => Actions.profileupdate({id: this.props.userData.id, becomeTutor: true})}

        />
      );
    }
  }

  render() {
  	const children = this.props.navigationState.children;
    const state = children[children.length - 1];
    const image = { uri: this.props.userData.image}
    const demoImage = require('./img/demo_profile_picture.jpg');
    const side = (
      <View style={style.main}>
        <View style={style.topView}>
          <Image
            style={style.image}
            source={ this.props.userData.image? image : demoImage }
          />
          <Text>{this.props.userData.first_name} {this.props.userData.last_name}</Text>
        </View>
        <View style={style.middleView}>
          <List>
            <ListItem
              title="Your Requests"
              leftIcon={{ name: 'ios-notifications', type: 'ionicon'}}
              onPress={() => Actions.tutor_home_screen()}
            />
            { this._renderTutorOptions() }
            <ListItem
              title={I18n.t('sideMenu.signOut')}
              leftIcon={{ name: 'logout', type: 'simple-line-icon' }}
              onPress={() => this.signOut()}
            />
          </List>
        </View>
        <View style={style.bottomView}>
          <Text></Text>
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

const mapStateToProps = (state) => {
  return {
    tutorMode: state.session.tutorMode,
    isTutor: state.session.isTutor,
    userData: state.session.userData
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ toggleSessionMode, signOut }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuComponent);