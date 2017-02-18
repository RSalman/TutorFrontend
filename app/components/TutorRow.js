import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';
import StyledText from './StyledText';

export default class TutorRow extends Component {
  render() {
    const { tutor } = this.props;
    // TODO: Use image URI instead of static image
    var image = require('./img/test.png');
    return (
      <TouchableWithoutFeedback onPress={() => Actions.tutorinfo({ id: tutor.id })}>
        <View style={styles.container}>
          <Image source={image} style={styles.photoContainer} />
          <View style={styles.informationContainer}>
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
              <View style={styles.rateContainer}>
                <StyledText style={styles.rate}> ${`${tutor.rate}`} </StyledText>
                <StyledText style={styles.averageRateText}> (Avg. Rate)</StyledText>
              </View>
            </View>
            <StyledText style={styles.degree}> {`${tutor.degree}`} </StyledText>
            <View style={[styles.row, styles.arrowRow]}>
              <View style={styles.iconContainer}>
                <Icon
                  style={styles.arrow}
                  name="chevron-right"
                  size={15}
                  color={chevronRightColor}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const starColor = '#FFC321';
const chevronRightColor = '#888888';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 5
  },
  informationContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  photoContainer: {
    height: 100,
    width: 100,
    borderRadius: 20
  },
  rateContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  iconContainer: { alignSelf: 'flex-end' },
  row: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  arrowRow: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 99
  },
  arrow: { opacity: 0.6 },
  averageRateText: { fontSize: 7 },
  rate: { fontWeight: 'bold' },
});
