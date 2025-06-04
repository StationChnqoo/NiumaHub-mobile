import BottomSheet from '@src/components/BottomSheet';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MyProps {
  show?: boolean;
  onClose?: () => void;
}

const InputModal: React.FC<MyProps> = props => {
  const {show, onClose} = props;

  return (
    <BottomSheet show={show} onClose={onClose}>
      <View style={styles.view}>
        <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>
          请输入
        </Text>
        <View style={{height: 12}} />
        <TextInput style={styles.input} />
        <View
          style={{height: useSafeAreaInsets().bottom, backgroundColor: '#fff'}}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 8,
    height: 36,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});

export default InputModal;
