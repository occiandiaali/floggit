import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomHeaderComponent from '../../components/molecules/customHeader';

const styles = StyleSheet.create({
  promotedWrapper: {},
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
                width: 320,
                height: 200,
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
    </View>
  );
}

export default HomeScreen;
