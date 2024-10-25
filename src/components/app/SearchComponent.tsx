'use strict;';
import React, {memo} from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import colors from '../../theme/colors';
import {Icons} from '../../assets';
import FlexButton from '../common/FlexButton';

type Props = {};

const SearchComponent = memo((props: Props) => {

  return (
    <View style={styles.SearchComponent}>
      <TextInput
        style={styles.input}
        placeholder="Search by title, description"
        placeholderTextColor={colors.grey}
        keyboardType="web-search"
        returnKeyType="search"
      />
      {/* <FlexButton style={styles.iconCont}>
        <Image source={Icons.filter} style={styles.icon} resizeMode="contain" />
      </FlexButton> */}
    </View>
  );
});

const styles = StyleSheet.create({
  SearchComponent: {
    flexDirection: 'row',
    marginHorizontal: 12,
    gap: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 0,
    paddingTop: 2,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: colors.grey,
    backgroundColor: colors.white,
    borderRadius: 10,
    color: colors.dark,
    fontWeight: '500',
  },
  iconCont: {
    width: 40,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.grey,
  },
  icon: {
    height: 20,
    width: 20,
  },
});

export default SearchComponent;
