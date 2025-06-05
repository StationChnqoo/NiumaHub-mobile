import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import WheelView from '../WheelView';
import Flex from '../Flex';
import c from '@src/constants/c';

interface MyProps {
  show: boolean;
  onClose: () => void;
  onShow?: () => void;
  onHide?: () => void;
  onConfirm: (time: {HH: String; mm: String}) => void;
}

const padZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);

const TimePicker: React.FC<MyProps> = props => {
  const {show, onClose, onHide, onShow, onConfirm} = props;
  const [HH, setHH] = useState('0');
  const [mm, setMm] = useState('0');

  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      propagateSwipe={true} // 允许手势传递
      animationInTiming={618}
      animationOutTiming={618}
      isVisible={show}
      onBackdropPress={onClose}
      onModalShow={onShow}
      onModalHide={onHide}
      useNativeDriver={false}
      hideModalContentWhileAnimating={true}
      statusBarTranslucent={false}
      backdropOpacity={0.58}
      style={{margin: 0, padding: 0, justifyContent: 'center'}}>
      <View style={styles.view}>
        <Text style={{color: '#333', fontSize: 16, fontWeight: '500'}}>
          请选择时间
        </Text>
        <View style={{height: 24}} />
        <Flex horizontal justify='space-between'>
          <View style={{width: '25%'}}>
            <WheelView
              data={Array.from({length: 24}, (_, i) => `${padZero(i)}`)}
              onScrollEnd={setHH}
            />
          </View>
          <View style={{width: '10%'}} />
          <View style={{width: '25%'}}>
            <WheelView
              data={Array.from({length: 60}, (_, i) => `${padZero(i)}`)}
              onScrollEnd={setMm}
            />
          </View>
        </Flex>
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
              onConfirm({HH, mm});
            }}
            style={[c.styles.button, c.styles.buttonFilled]}>
            <Text style={{color: '#fff', fontSize: 14}}>确认</Text>
          </TouchableOpacity>
        </Flex>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 16,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'white',
    width: '75%',
    alignSelf: 'center',
  },
});

export default TimePicker;
