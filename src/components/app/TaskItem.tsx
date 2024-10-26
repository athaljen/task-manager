'use strict';
import React, {memo, useCallback, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {TaskType} from '../../types/task.type';
import Card from './Card';
import {Text500, Text600} from '../common/Texts';
import colors from '../../theme/colors';
import {Icons} from '../../assets';
import moment from 'moment';
import {Menu, MenuDivider, MenuItem} from 'react-native-material-menu';
import gs from '../../theme/gs';

type Props = {
  item: TaskType;
  onPress: (item: TaskType) => void;
  onEdit: (item: TaskType) => void;
  onDelete: (item: TaskType) => void;
};

const TaskItem = ({item, onPress, onDelete, onEdit}: Props) => {
  const [Visible, setVisible] = useState(false);

  const onMenuPress = useCallback(
    (type: 'edit' | 'delete') => {
      setVisible(false);
      if (type === 'edit') onEdit?.(item);
      else if (type === 'delete') onDelete?.(item);
    },
    [onEdit, onDelete, item],
  );

  return (
    <Card style={styles.TaskItem} onPress={onPress.bind(null, item)}>
      <View style={styles.iconCont}>
        <Image
          source={Icons[item.category] || Icons.Default}
          style={gs.Icon25}
          resizeMode="contain"
          tintColor={'#7b7b7b'}
        />
        {item.isCompleted ? (
          <Image
            source={Icons.check}
            style={styles.checked}
            resizeMode="contain"
          />
        ) : null}
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
            {moment(item.date, 'DD-MM-YYYY').format('DD-MMM-YYYY')}
          </Text600>
          {item.start || item.end ? (
            <View style={styles.timeCont}>
              <Text500 numberOfLines={1} style={styles.time}>
                {item.start}
                {item.end && item.start ? ' - ' : ''}
                {item.end}
              </Text500>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.moreCont}>
        <Menu
          visible={Visible}
          style={{backgroundColor: colors.white}}
          onRequestClose={setVisible.bind(null, false)}
          anchor={
            <Pressable
              testID="menu-button"
              onPress={setVisible.bind(null, true)}
              style={styles.menuPress}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </Pressable>
          }>
          <MenuItem
            style={styles.menuItem}
            onPress={onMenuPress?.bind(null, 'edit')}
            textStyle={styles.edit}>
            Edit
          </MenuItem>
          <MenuDivider />
          <MenuItem
            style={styles.menuItem}
            onPress={onMenuPress?.bind(null, 'delete')}
            textStyle={styles.delete}>
            Delete
          </MenuItem>
        </Menu>
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
    marginRight: 10,
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
  menuItem: {borderRadius: 10, maxWidth: 100},
  edit: {color: colors.blue, fontFamily: 'Poppins-SemiBold'},
  delete: {color: colors.red, fontFamily: 'Poppins-SemiBold'},
  moreCont: {justifyContent: 'center'},
  menuPress: {paddingHorizontal: 10, height: 40, justifyContent: 'center'},
  dot: {
    height: 4,
    width: 4,
    marginVertical: 2,
    borderRadius: 5,
    backgroundColor: colors.black,
  },
  checked: {position: 'absolute', top: 0, right: 0, height: 20, width: 20},
});

export default memo(TaskItem);
