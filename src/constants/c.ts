// src/constants/c.ts
import {StyleSheet} from 'react-native';

enum fonts {
  digital7 = 'digital-7',
  digital7mono = 'digital-7-mono',
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: 'white',
    zIndex: 1,
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

const colors = {
  red: '#ff5252',
};

const c = {
  fonts,
  styles,
  colors,
};

export default c;
