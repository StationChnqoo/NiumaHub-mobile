import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import * as React from 'react';
// 这个地方用Path alias，@/App会报错
import App from '../../App';
import HelloWorld from './HelloWorld';
import WorkTimeConfig from './WorkTimeConfig';

export type RootStacksParams = {
  App: undefined;
  HelloWorld: {id: string};
  WorkTimeConfig: {id: string};
};

const RootStack = createNativeStackNavigator<RootStacksParams>();

export type RootStacksProp = NativeStackNavigationProp<RootStacksParams>;
export const navigationRef = createNavigationContainerRef<RootStacksParams>();

export default function Stacks() {
  // const navigator = useNavigationContainerRef();
  // useFlipper(navigator);
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        id={undefined}
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
          animationDuration: 618,
        }}>
        <RootStack.Screen name="App" component={App} />
        <RootStack.Screen name="HelloWorld" component={HelloWorld} />
        <RootStack.Screen name="WorkTimeConfig" component={WorkTimeConfig} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
