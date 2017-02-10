import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import {
    Grid,
    Row,
    Button
} from 'react-native-elements';

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
      <Grid>
        <Row>
          <View
            style={style.container}
          >
            <Button
              raised
              icon={{ name: 'cached' }}
              title="button icon"
              onPress={this.pressFunct}
            />
          </View>
        </Row>
        <Row>
          <View style={style2.container}>
            <Text>Blue background</Text>
          </View>
        </Row>
      </Grid>
    );
  }
}

const yellow = '#ff7733';
const blue = '#8080ff';
const style = StyleSheet.create({
  container: {
    backgroundColor: yellow,
    flex: 1, flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
const style2 = StyleSheet.create({
  container: {
    backgroundColor: blue
  }
});

export default Homeview;
