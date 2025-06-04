import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksParams, RootStacksProp} from '..';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'HelloWorld'>;
}

const HelloWorld: React.FC<MyProps> = props => {
  const {navigation, route} = props;

  // const network = useNetwork();
  // useFocusEffect(useCallback(() => {}, [sound]));

  return (
    <View style={{flex: 1}}>
      <View style={styles.view}>
        <TouchableOpacity
          onPress={() => {
            navigation?.goBack();
          }}>
          <Text>{route?.params.id}</Text>
          <Text>Go back</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: useSafeAreaInsets().bottom}} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HelloWorld;
