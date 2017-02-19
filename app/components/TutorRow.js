import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';
import StyledText from './StyledText';

export default class TutorRow extends Component {
  renderSubtitle(tutor) {
    return (
      <View style={styles.subtitleView}>
        <View style={styles.row}>
          <StarRating
            style={styles.stars}
            disabled
            maxStars={5}
            rating={tutor.rating}
            starSize={20}
            selectedStar={function() {}}
            starColor={starColor}
          />
          <View style={styles.rateRow}>
            <View style={styles.rateColumn}>
              <StyledText style={styles.rate}> ${`${tutor.rate}`}/hr </StyledText>
              <StyledText style={styles.averageRateText}> (Avg. Rate)</StyledText>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <StyledText> {`${tutor.degree}`} </StyledText>
        </View>
      </View>
    );
  }

  render() {
    const { tutor } = this.props;
    // TODO: Use image URI instead of static image
    var image = require('./img/test.png');
    return (
      <ListItem
        onPress={() => Actions.tutorinfo({ id: tutor.id })}
        roundAvatar
        avatar={image}
        avatarStyle={styles.avatarStyle}
        subtitle={this.renderSubtitle(tutor)}
      />
    );
  }
}

const starColor = '#FFC321';
const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  rateColumn: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  avatarStyle: {
    height: 50,
    width: 50
  },
  averageRateText: { fontSize: 7 }
});
