import {RouteProp} from '@react-navigation/native';
import {useCaches} from '@src/constants/stores';
import {useInterval} from 'ahooks';
import dayjs from 'dayjs';
import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksParams, RootStacksProp} from '..';
import Flex from '@src/components/Flex';
import {fonts} from '@src/constants/c';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'WorkTimeConfig'>;
}

const WorkTimeConfig: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {bears, increase, currentJob} = useCaches();
  const [interval, setInterval] = React.useState<undefined | null | number>(
    undefined,
  );
  const [s, setS] = useState(0);

  // const network = useNetwork();
  // useFocusEffect(useCallback(() => {}, [sound]));
  useInterval(() => {
    setS(t => t + 1);
  }, interval);

  const todayWorkedStatus = (
    now: dayjs.Dayjs,
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
    salary: number,
  ) => {
    if (now.isBefore(start)) return {income: 0, countdown: ''};
    if (now.isAfter(end)) return {income: 0, countdown: ''};

    const secondsWorked = now.diff(start, 'second');
    const totalSeconds = end.diff(start, 'second');
    const earned =
      (salary / currentJob.resetDayMode / totalSeconds) * secondsWorked;

    const remainingSeconds = end.diff(now, 'second');
    const h = Math.floor(remainingSeconds / 3600);
    const m = Math.floor((remainingSeconds % 3600) / 60);
    const s = remainingSeconds % 60;
    const countdown = `${String(h).padStart(2, '0')}:${String(m).padStart(
      2,
      '0',
    )}:${String(s).padStart(2, '0')}`;

    return {
      income: earned,
      countdown,
    };
  };

  const {income, countdown} = useMemo(() => {
    const now = dayjs();
    const today = now.format('YYYY-MM-DD');
    const start = dayjs(`${today} ${currentJob.startTime}`);
    const end = dayjs(`${today} ${currentJob.endTime}`);
    return todayWorkedStatus(now, start, end, currentJob.salary);
  }, [currentJob, s]);

  useEffect(() => {
    setInterval(1000);
    return () => {};
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.view}>
          <Flex horizontal justify={'space-between'}>
            <Text style={{color: '#666', fontSize: 14}}>今日收入</Text>
            <Text
              style={{
                fontFamily: fonts.Digital7,
                color: '#333',
                fontSize: 24,
              }}>
              {income.toFixed(2)}
            </Text>
          </Flex>
          <Text style={{color: '#666', fontSize: 14}}>
            距离下班：{countdown}
          </Text>
        </View>
      </ScrollView>
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
    paddingHorizontal: '5%',
  },
});

export default WorkTimeConfig;
