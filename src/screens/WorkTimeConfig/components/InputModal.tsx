import BottomSheet from '@src/components/BottomSheet';
import Flex from '@src/components/Flex';
import c from '@src/constants/c';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyProps {
  show?: boolean;
  onClose?: () => void;
  onConfirm: (s: string) => void;
}

const InputModal: React.FC<MyProps> = props => {
  const {show, onClose, onConfirm} = props;
  const [text, setText] = useState('');

  return (
    <BottomSheet
      show={show}
      onClose={onClose}
      onHide={() => {
        setText('');
      }}>
      <View style={styles.view}>
        <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>
          请输入
        </Text>
        <View style={{height: 12}} />
        <TextInput style={styles.input} value={text} onChangeText={setText} />
        <View style={{height: 24}} />
        <Flex justify={'flex-end'} style={{gap: 16}} horizontal>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onClose}
            style={[c.styles.button, c.styles.buttonBordered]}>
            <Text style={{color: '#987123', fontSize: 14}}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              onConfirm(text);
            }}
            style={[c.styles.button, c.styles.buttonFilled]}>
            <Text style={{color: '#fff', fontSize: 14}}>确认</Text>
          </TouchableOpacity>
        </Flex>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
