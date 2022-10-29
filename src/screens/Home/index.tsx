import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomHeaderComponent from '../../components/molecules/customHeader';

const styles = StyleSheet.create({
  promotedWrapper: {},
  levels: {
    paddingBottom: 8,
  },
  level1Label: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  level2Label: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  level3Label: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  levelsWrapper: {
    padding: 6,
  },
  wrapper: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#ffffff',
  },
});

const promos = [
  {
    id: 1,
    label: 'ONE',
  },
  {
    id: 2,
    label: 'TWO',
  },
  {
    id: 3,
    label: 'THREE',
  },
  {
    id: 4,
    label: 'FOUR',
  },
  {
    id: 5,
    label: 'FIVE',
  },
  {
    id: 6,
    label: 'SIX',
  },
];

function HomeScreen() {
  return (
    <View style={styles.wrapper}>
      <CustomHeaderComponent />
      <View style={styles.promotedWrapper}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {promos.map(el => (
            <View
              key={el.id}
              style={{
                margin: 8,
                width: 350,
                height: 250,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                backgroundColor: 'teal',
              }}>
              <Text>{el.label}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        style={styles.levelsWrapper}
        showsVerticalScrollIndicator={false}>
        <View style={styles.levels}>
          <Text style={styles.level1Label}>Level One</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {promos.map(el => (
              <View
                key={el.id}
                style={{
                  margin: 8,
                  width: 320,
                  height: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                  borderColor: 'pink',
                  borderWidth: 1.5,
                  // backgroundColor: 'teal',
                }}>
                <Text>{el.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.levels}>
          <Text style={styles.level2Label}>Level Two</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {promos.map(el => (
              <View
                key={el.id}
                style={{
                  margin: 8,
                  width: 320,
                  height: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                  borderColor: 'pink',
                  borderWidth: 1.5,
                }}>
                <Text>{el.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.levels}>
          <Text style={styles.level3Label}>Level Three</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {promos.map(el => (
              <View
                key={el.id}
                style={{
                  margin: 8,
                  width: 320,
                  height: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                  borderColor: 'pink',
                  borderWidth: 1.5,
                }}>
                <Text>{el.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
