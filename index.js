import { AppRegistry, View } from 'react-native';
import { name as appName } from './app.json';
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Stacks from './src/screens';

const NiumaHub = () => {
    return <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
            <Stacks />
        </View>
    </GestureHandlerRootView>;
};

AppRegistry.registerComponent(appName, () => NiumaHub);
