import React, { useCallback, useState, type PropsWithChildren } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { excuteCalculator } from './NativeCalculateUtils';

export type TypeCalcAction = 'plus' | 'minus' | 'multiply' | 'divide' | 'equal' | 'clear';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const screenSize = useWindowDimensions();
  const buttonSize = screenSize.width / 3; //4열이 있을것이므로 나누기 4

  const numberPad: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const [resultNum, setResultNum] = useState<string>('');
  const [inputNum, setInputNum] = useState<string>('');
  const [tempNum, setTempNum] = useState<number>(0);
  const [lastAction, setLastAction] = useState<
    'plus' | 'minus' | 'multiply' | 'divide' | 'equal' | null
  >(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPressNumber = useCallback<(pressed: number) => void>(
    pressed => {
      console.log(pressed);
      //연산결과가 공백문자가 아니라는것은, 연산을 새로한다는 뜻으로써, 초기화한다.
      if (resultNum !== '') {
        setResultNum('');
        setTempNum(0);
        setInputNum('');
        return;
      }

      setInputNum(prevState => {
        // 01 입력했을떄, 1로 초기화 하기 위해
        const nextNum = parseInt(`${prevState}${pressed}`);
        return nextNum.toString();
      });
    },
    [resultNum],
  );

  const onPressAction = useCallback<(action: TypeCalcAction) => Promise<void>>(
    async pressed => {
      console.log(pressed);
      //console.log(NativeModules.CalculatorModule);
      if (pressed === 'clear') {
        setTempNum(0);
        setInputNum('');
        setResultNum('');
        return;
      }

      if (pressed === 'equal') {
        if (tempNum !== 0 && lastAction !== null) {
          const result = await excuteCalculator(lastAction, tempNum, parseInt(inputNum));
          console.log(result);
          setResultNum(result.toString());
          setTempNum(0);
          return;
        }
      }
      setLastAction(pressed);

      if (resultNum !== '') {
        //결과값이 존재할떄
        setTempNum(Number(resultNum));
        setResultNum('');
        setInputNum('');
      } else if (tempNum === 0) {
        //처음입력하는경우
        setTempNum(parseInt(inputNum));
        setInputNum('');
      } else {
        //계산
        const result = await excuteCalculator(pressed, tempNum, parseInt(inputNum));
        console.log(result);
        setResultNum(result.toString());
        setTempNum(0);
      }
    },
    [lastAction, tempNum, inputNum, resultNum],
  );

  const calculatorButton = [
    { label: '+', action: 'plus' },
    { label: '-', action: 'minus' },
    { label: '*', action: 'multiply' },
    { label: '/', action: 'divide' },
    { label: 'C', action: 'clear' },
    { label: '=', action: 'equal' },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
          <Text style={{ fontSize: 48, padding: 48 }}>
            {resultNum !== '' ? resultNum : inputNum}
          </Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 4,
            }}
          >
            {numberPad.map(number => (
              <Pressable
                style={{
                  width: buttonSize - 40,
                  height: buttonSize - 40,
                  borderRadius: (buttonSize - 4) * 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'gray',
                }}
                onPress={() => onPressNumber(number)}
              >
                <Text style={{ fontSize: 24 }}>{number}</Text>
              </Pressable>
            ))}
          </View>

          <View style={{ paddingHorizontal: 6 }}>
            {calculatorButton.map(action => {
              return (
                <Pressable
                  style={{
                    width: screenSize.width / 6.7,
                    height: screenSize.width / 6.2,
                    borderRadius: (screenSize.width / 6) * 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'lightgray',
                  }}
                  onPress={() => onPressAction(action.action as TypeCalcAction)}
                >
                  <Text style={{ fontSize: 24 }}>{action.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
