import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';

class Homeview extends Component {
  constructor() {
    super();
    this.state = {
      sideIsHidden: true
    };
    this.pressFunct = this.pressFunct.bind(this);
  }

  pressFunct() {
    var newSideIsHidden = !this.state.sideIsHidden;
    this.setState({ sideIsHidden: newSideIsHidden });
    this.props.onPressFunct(this.state.sideIsHidden);
  }
  render() {
    return (
      <View style={style.container} >
        <View style={style.view1} />
        <View style={style.view2}>
          <Button
            buttonStyle={style.menuButton}
            icon={{ name: 'menu' }}
            onPress={this.pressFunct}
          />
        </View>
        <View style={style.view3} >
          <Text>Blue background</Text>
        </View>
      </View>
    );
  }
}

const yellow = '#ff7733';
const blue = '#8080ff';
const transparent = 'transparent';
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton:{
    width: 50,
    height: 50,
    backgroundColor: transparent
  },
  view1: {
    flex: 1,
    backgroundColor: blue,
  },
  view2:{
    flex: 5,
    backgroundColor: yellow,
  },
  view3:{
    flex: 5,
    backgroundColor: blue
  }
});

export default Homeview;
