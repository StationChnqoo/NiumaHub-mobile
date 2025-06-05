import {RouteProp} from '@react-navigation/native';
import Flex from '@src/components/Flex';
import MoreButton from '@src/components/MoreButton';
import ToolBar from '@src/components/ToolBar';
import c from '@src/constants/c';
import {useCaches} from '@src/constants/stores';
import {ResetDayModeEnum} from '@src/constants/t';
import {useInterval} from 'ahooks';
import dayjs from 'dayjs';
import {produce} from 'immer';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksParams, RootStacksProp} from '..';
import InputModal from './components/InputModal';
import TimePicker from '@src/components/TimePicker';

const ResetDayOptions = [
  {label: '单休', value: ResetDayModeEnum.DAN},
  {label: '双休', value: ResetDayModeEnum.SHUANG},
  {label: '大小周', value: ResetDayModeEnum.DAXIAO},
];

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'WorkTimeConfig'>;
}

const WorkTimeConfig: React.FC<MyProps> = props => {
  const {navigation, route} = props;
  const {bears, increase, currentJob, setCurrentJob} = useCaches();
  const [interval, setInterval] = React.useState<undefined | null | number>(
    undefined,
  );
  const [s, setS] = useState(0);
  const [isShowInputModal, setIsShowInputModal] = useState(false);
  const [isShowTimePicker, setIsShowTimePicker] = useState(false);

  // const nework = useNetwork();
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
    if (now.isBefore(start)) return {income: 0, countdown: '还没上班哦😴'};
    if (now.isAfter(end))
      return {
        income: salary / currentJob.resetDayMode,
        countdown: '已经下班啦😄',
      };

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
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <ToolBar
        title={'牛马计算器'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.view}>
          <View style={{height: 12}} />
          <View style={styles.previewCell}>
            <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>
              预览
            </Text>
            <View style={{height: 12}} />
            <Flex horizontal justify={'space-between'}>
              <Text style={{color: '#666', fontSize: 14}}>今日收入</Text>
              <Text
                style={{
                  color: c.colors.red,
                  fontSize: 16,
                }}>
                {income.toFixed(2)}
              </Text>
            </Flex>
            <View style={{height: 12}} />
            <Flex horizontal justify={'space-between'}>
              <Text style={{color: '#666', fontSize: 14}}>距离下班</Text>
              <Text
                style={{
                  color: c.colors.red,
                  fontSize: 16,
                }}>
                {countdown}
              </Text>
            </Flex>
          </View>
          <View style={{height: 12}} />
          <View style={styles.previewCell}>
            <Text style={{fontSize: 16, color: '#333', fontWeight: '500'}}>
              设置
            </Text>
            <View style={{height: 12}} />
            <Flex horizontal justify={'space-between'}>
              <Text style={{color: '#666', fontSize: 14}}>税前收入/月</Text>
              <MoreButton
                label={`${currentJob.salary}`}
                onPress={() => {
                  setIsShowInputModal(true);
                }}
              />
            </Flex>
            <View style={{height: 12}} />
            <Flex horizontal justify={'space-between'}>
              <Text style={{color: '#666', fontSize: 14}}>上班时间</Text>
              <MoreButton
                label={`${currentJob.startTime}`}
                onPress={() => {
                  setIsShowTimePicker(true);
                }}
              />
            </Flex>
            <View style={{height: 12}} />
            <Flex horizontal justify={'space-between'}>
              <Text style={{color: '#666', fontSize: 14}}>下班时间</Text>
              <MoreButton
                label={`${currentJob.endTime}`}
                onPress={() => {
                  setIsShowTimePicker(true);
                }}
              />
            </Flex>
            <View style={{height: 12}} />
            <Flex horizontal justify={'space-between'}>
              <Text style={{color: '#666', fontSize: 14}}>休息方式</Text>
              <Flex horizontal style={{gap: 12}}>
                {ResetDayOptions.map((it, i) => (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.8}
                    onPress={() => {
                      setCurrentJob(
                        produce(currentJob, draft => {
                          draft.resetDayMode = it.value;
                        }),
                      );
                    }}
                    style={[
                      styles.tag,
                      it.value == currentJob.resetDayMode
                        ? {borderColor: '#987123'}
                        : {borderColor: '#999'},
                    ]}>
                    <Text
                      style={[
                        {fontSize: 14},
                        it.value == currentJob.resetDayMode
                          ? {color: '#987123'}
                          : {color: '#999'},
                      ]}>
                      {it.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </Flex>
            </Flex>
          </View>
        </View>
      </ScrollView>
      <View
        style={{height: useSafeAreaInsets().bottom, backgroundColor: '#fff'}}
      />
      <InputModal
        show={isShowInputModal}
        onClose={() => {
          setIsShowInputModal(false);
        }}
      />
      <TimePicker
        show={isShowTimePicker}
        onClose={() => {
          setIsShowTimePicker(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  previewCell: {
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
});

export default WorkTimeConfig;
