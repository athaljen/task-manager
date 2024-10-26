'use strict;';
import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import colors from '../../theme/colors';
import {Text600} from '../common/Texts';
import gs from '../../theme/gs';
import FlexButton from '../common/FlexButton';
import TaskCategory from '../../constants/TaskCategory';
import {Icons} from '../../assets';

type Props = {
  selected: string;
  onSelect: (i: keyof typeof TaskCategory) => void;
  disable?: boolean;
  title?: string;
};

const CategoryComp = memo(({disable, onSelect, title, selected}: Props) => {
  return (
    <React.Fragment>
      <Text600 style={gs.mt5}>{title || 'Category'}</Text600>
      <View style={styles.category}>
        {Object.values(TaskCategory).map(item => (
          <FlexButton
            testID={`categoryId-${item}`}
            key={item}
            style={[
              styles.catItems,
              {
                backgroundColor:
                  selected == item ? colors.blue : colors.blueLight,
              },
            ]}
            disabled={disable}
            onPress={onSelect.bind(null, item)}>
            <Image
              source={Icons[item]}
              style={gs.Icon15}
              resizeMode="contain"
              tintColor={selected == item ? colors.white : colors.dark}
            />
            <Text600
              style={{
                color: selected == item ? colors.white : colors.dark,
              }}>
              {item}
            </Text600>
          </FlexButton>
        ))}
      </View>
    </React.Fragment>
  );
});

const styles = StyleSheet.create({
  catItems: {
    backgroundColor: colors.blueLight,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 5,
  },
  category: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    gap: 10,
  },
});

export default CategoryComp;
