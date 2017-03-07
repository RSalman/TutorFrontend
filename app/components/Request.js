import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, ListView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

import TopNavBar from './TopNavBar';

export default class Request extends Component {
  constructor() {
    super();
    var approvedRequests = [
      {
        key: 1,
        name: 'Leilaa',
        age: '34'
      },
      {
        key: 2,
        name: 'Mary',
        age: '23'
      }
    ];
    this.state = { datasource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(approvedRequests) };
  }
  render() {
    const { toggled } = this.props;
    const { tabName } = this.props;
    return (
      <ScrollView style={style.container}>
        <TopNavBar toggled={toggled} tabName={tabName} />
        <View style={style.viewContainer}>
          <View style={style.card}>
            <Card title="Pending requests">
              <ListView
                dataSource={this.state.datasource}
                renderRow={(row) => <Text>{row.name}</Text>}
              />
            </Card>
          </View>
          <View style={style.card}>
            <Card title="Approved requests">
              <ListItem title="anapp" />
              <ListItem title="a req" />
              <ListItem title="a req" />
              <ListItem title="a req" />
              <ListItem title="a req" />
              <ListItem title="a req" />
            </Card>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const white = 'white';
const blue = '#8080ff';
const style = StyleSheet.create({
  container:{
    backgroundColor: white,
    flex: 1
  },
  viewContainer: { backgroundColor: blue, },
  card:{ margin: 10 }
});
