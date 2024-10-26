'use strict;';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import colors from '../../theme/colors';
import {Icons} from '../../assets';
import FlexButton from '../common/FlexButton';
import gs from '../../theme/gs';
import CategoryComp from './CategoryComp';
import Button from '../common/Button';
import debounce from 'lodash.debounce';

type Props = {
  onSearch?: ({text, category}: {text: string; category: string}) => void;
};

const SearchComponent = memo(({onSearch}: Props) => {
  const [Filters, setFilters] = useState({text: '', category: ''});
  const [Visible, setVisible] = useState(false);

  const handleChange = useCallback((t: 'text' | 'category', val: string) => {
    setFilters(prev => ({...prev, [t]: val}));
  }, []);

  const handleApplyFilter = () => {
    onSearch?.({text: Filters.text, category: Filters.category});
  };

  useEffect(() => {
    debounce(handleApplyFilter, 1000);
  }, [Filters.text]);

  return (
    <View style={styles.SearchComponent}>
      <TextInput
        style={styles.input}
        placeholder="Search by title, description"
        placeholderTextColor={colors.grey}
        returnKeyType="search"
        value={Filters.text}
        onChangeText={handleChange.bind(this, 'text')}
      />
      <FlexButton style={styles.iconCont}>
        <Image source={Icons.filter} style={gs.Icon20} resizeMode="contain" />
      </FlexButton>

      <Modal visible={Visible} transparent statusBarTranslucent>
        <Pressable
          style={styles.backdrop}
          onPress={setVisible.bind(null, false)}>
          <View style={styles.content}>
            <CategoryComp
              title="Select Category"
              selected={Filters.category}
              onSelect={handleChange.bind(this, 'category')}
            />
            <View style={[gs.fdRow, gs.gap10, gs.mv10]}>
              <Button
                title="Clear"
                buttonStyle={[gs.flex1, gs.bgGray]}
                onPress={() => {
                  setVisible(false);
                  handleChange('category', '');
                }}
              />
              <Button
                title="Apply"
                buttonStyle={[gs.flex1]}
                onPress={() => {
                  setVisible(false);
                  handleApplyFilter;
                }}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
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
  backdrop: {
    flex: 1,
    backgroundColor: colors.backdrop,
    justifyContent: 'flex-end',
  },
  content: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: colors.white,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
  },
});

export default SearchComponent;
