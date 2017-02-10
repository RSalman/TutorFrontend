import React, { Component } from 'react';
import { Text } from 'react-native';
import {
    Button
} from 'react-native-elements';

export default class LeilaFeatureView extends Component {
  render() {
    return (
        <Button
            raised
            icon={{name: 'cached'}}
            title='RAISED WITH ICON' />
    );
  }
}
