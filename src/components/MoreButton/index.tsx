import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Flex from '../Flex';

interface MyProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const MoreButton: React.FC<MyProps> = props => {
  const {label, onPress, disabled} = props;
  // const {theme} = useCaches();
  let color = disabled ? '#999' : '#987123';
  return (
    <TouchableOpacity
      hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
      activeOpacity={0.9}
      disabled={disabled}
      onPress={onPress}>
      <Flex horizontal>
        <Text style={{color, fontSize: 16}}>{label}</Text>
        <View style={{width: 4}} />
        <Image
          source={require('@src/assets/images/common/arrow_right.png')}
          style={{height: 16, width: 16, tintColor: color}}
        />
      </Flex>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default MoreButton;
