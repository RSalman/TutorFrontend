import React, { Component } from 'react';
import { Tabs, Tab, Icon } from 'react-native-elements';

import ProfileTab from './Profile';
import RequestsTab from './Request';

class Homeview extends Component {
  constructor() {
    super();
    this.state = { selectedTab: 'profileTab' };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(selectedTab) {
    this.setState({ selectedTab });
  }
  render() {
    const { toggled } = this.props;
    const { selectedTab } = this.state;
    return (
      <Tabs>
        <Tab
          selected={selectedTab === 'profileTab'}
          onPress={()=>this.changeTab('profileTab')}
          renderIcon={()=><Icon name="hourglass-empty" color="#5e6977" size={30} />}
          renderSelectedIcon={()=><Icon name="hourglass-empty" color="#517fa4" size={35} />}
        >
          <ProfileTab toggled={toggled} tabName="Pending Requests" />
        </Tab>
        <Tab
          selected={selectedTab === 'requestTab'}
          onPress={()=>this.changeTab('requestTab')}
          renderIcon={()=><Icon name="done" color="#5e6977" size={30} />}
          renderSelectedIcon={()=><Icon name="done" color="#517fa4" size={35} />}
        >
          <RequestsTab toggled={toggled} tabName="Approved Requests" />
        </Tab>
      </Tabs>
    );
  }
}
export default Homeview;
