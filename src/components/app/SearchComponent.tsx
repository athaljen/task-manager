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
  onSearch: ({text, category}: {text?: string; category?: string}) => void;
  isFilterApplied?: boolean;
};

const SearchComponent = memo(({onSearch, isFilterApplied}: Props) => {
  const [Filters, setFilters] = useState({text: '', category: ''});
  const [Visible, setVisible] = useState(false);

  useEffect(() => {
    ///debounce the search
    const search = debounce(() => onSearch({text: Filters.text}), 500);
    search();
    return search.cancel;
  }, [Filters.text]);

  const onClear = useCallback(() => {
    setVisible(false);
    setFilters(prev => ({...prev, category: ''}));
    onSearch({category: ''});
  }, [Filters.category, onSearch]);

  const onApply = useCallback(() => {
    setVisible(false);
    onSearch({category: Filters.category});
  }, [Filters.category, onSearch]);

  const onTextChange = useCallback((t: string) => {
    setFilters(prev => ({...prev, text: t}));
  }, []);

  return (
    <View style={styles.SearchComponent}>
      <View style={styles.inputCont}>
        <TextInput
          style={styles.input}
          placeholder="Search by title, description"
          placeholderTextColor={colors.grey}
          returnKeyType="search"
          value={Filters.text}
          onChangeText={onTextChange}
        />
        {Filters.text ? (
          <FlexButton onPress={onTextChange.bind(null, '')}>
            <Image
              source={Icons.close}
              style={gs.Icon15}
              resizeMode="contain"
              tintColor={colors.greyDark}
            />
          </FlexButton>
        ) : (
          <Image
            source={Icons.search}
            style={[gs.Icon18, gs.ms5]}
            resizeMode="contain"
            tintColor={colors.greyDark}
          />
        )}
      </View>
      <FlexButton style={styles.iconCont} onPress={setVisible.bind(null, true)}>
        <Image
          source={Icons.filter}
          style={gs.Icon20}
          resizeMode="contain"
          tintColor={isFilterApplied ? colors.green : colors.grey}
        />
        {isFilterApplied ? <View style={styles.dot} /> : null}
      </FlexButton>

      <Modal visible={Visible} transparent statusBarTranslucent>
        <Pressable
          style={styles.backdrop}
          onPress={setVisible.bind(null, false)}>
          <View style={styles.content}>
            <CategoryComp
              title="Select Category"
              selected={Filters.category}
              onSelect={cat => {
                setFilters(prev => ({...prev, category: cat}));
              }}
            />
            <View style={[gs.fdRow, gs.gap10, gs.mv10]}>
              <Button
                title="Clear"
                buttonStyle={[gs.flex1, gs.bgGray]}
                onPress={onClear}
              />
              <Button
                title="Apply"
                buttonStyle={[gs.flex1]}
                onPress={onApply}
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
  inputCont: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: colors.grey,
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.dark,
    padding: 0,
    paddingTop: 2,
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
  dot: {
    height: 8,
    width: 8,
    borderRadius: 5,
    backgroundColor: colors.red,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default SearchComponent;
