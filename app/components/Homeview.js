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
          renderIcon={()=><Icon name="done" size={30} />}
          renderSelectedIcon={()=><Icon name="done" color="green" size={30} />}
        >
          <ProfileTab toggled={toggled} tabName="Pending Requests" />
        </Tab>
        <Tab
          selected={selectedTab === 'requestTab'}
          onPress={()=>this.changeTab('requestTab')}
          renderIcon={()=><Icon name="hourglass-empty" size={30} />}
          renderSelectedIcon={()=><Icon name="hourglass-empty" color="orange" size={30} />}
        >
          <RequestsTab toggled={toggled} tabName="Approved Requests" />
        </Tab>
      </Tabs>
    );
  }
}
export default Homeview;
