'use strict';
import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TaskType} from '../../types/task.type';
import Card from './Card';
import {Text400, Text500, Text600} from '../common/Texts';
import colors from '../../theme/colors';
import {Icons} from '../../assets';
import moment from 'moment';

type Props = {item: TaskType; onPress: (item: TaskType) => void};

const TaskItem = ({item, onPress}: Props) => {
  return (
    <Card style={styles.TaskItem} onPress={onPress.bind(null, item)}>
      <View style={styles.iconCont}>
        <Image
          source={Icons[item.category] || Icons.All}
          style={styles.icon}
          resizeMode="contain"
          tintColor={'#7b7b7b'}
        />
      </View>
      <View style={styles.details}>
        <Text600 numberOfLines={1} style={styles.title}>
          {item.title}
        </Text600>
        <Text500 numberOfLines={1} style={styles.desc}>
          {item.description}
        </Text500>
        <View style={styles.lower}>
          <Text600 numberOfLines={1} style={styles.date}>
            {moment(item.date).format('DD-MMM-YYYY')}
          </Text600>
          <View style={styles.timeCont}>
            <Text500 numberOfLines={1} style={styles.time}>
              {item.start} - {item.end}
            </Text500>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  TaskItem: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: colors.blueLight,
    marginHorizontal: 15,
    flexDirection: 'row',
    maxHeight: 75,
    padding: 8,
  },
  details: {flex: 1, flexShrink: 1},
  title: {fontSize: 16, fontWeight: 'bold'},
  desc: {fontSize: 13, color: colors.greyDark},
  date: {fontSize: 13, color: colors.dark},
  lower: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 1,
  },
  timeCont: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  time: {fontSize: 13, color: colors.greyDark},
  iconCont: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginRight: 10,
    borderRadius: 10,
  },
  icon: {height: 25, width: 25},
});

export default memo(TaskItem);
