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
          renderIcon={()=><Icon name="g-translate" />}
        >
          <ProfileTab toggled={toggled} />
        </Tab>
        <Tab
          selected={selectedTab === 'requestTab'}
          onPress={()=>this.changeTab('requestTab')}
          renderIcon={()=><Icon name="g-translate" />}
        >
          <RequestsTab toggled={toggled} />
        </Tab>
      </Tabs>
    );
  }
}

export default Homeview;
