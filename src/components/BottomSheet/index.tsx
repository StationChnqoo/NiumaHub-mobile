import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MyProps {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  onShow?: () => void;
  onHide?: () => void;
}

const BottomSheet: React.FC<MyProps> = props => {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const {children, show, onClose, onHide, onShow} = props;
  
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardWillShow', () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener('keyboardWillHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <Modal
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      propagateSwipe={true} // 允许手势传递
      // animationInTiming={618}
      // animationOutTiming={618 * 2}
      isVisible={show}
      onBackdropPress={onClose}
      onModalShow={onShow}
      onModalHide={onHide}
      useNativeDriver={true}
      hideModalContentWhileAnimating={false}
      statusBarTranslucent={false}
      backdropOpacity={0.58}
      style={{margin: 0, padding: 0, justifyContent: 'flex-end'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1, justifyContent: 'flex-end'}} // 例如底部弹窗
      >
        {children}
        <View
          style={{
            height: keyboardVisible ? 0 : insets.bottom,
            backgroundColor: '#fff',
          }}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'white',
  },
});

export default BottomSheet;
