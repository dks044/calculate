/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, type PropsWithChildren } from 'react';
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

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const screenSize = useWindowDimensions();
  const buttonSize = screenSize.width / 3; //4열이 있을것이므로 나누기 4

  const numberPad: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPressNumber = useCallback<(pressed: number) => void>(pressed => {
    console.log(pressed);
  }, []);

  const onPressAction = useCallback<(action: string) => void>(pressed => {
    console.log(pressed);
  }, []);

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
          <Text style={{ fontSize: 48, padding: 48 }}>연산결과 나오는곳</Text>
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
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

          <View style={{ paddingHorizontal: 12 }}>
            {[
              { label: '+', action: 'plus' },
              { label: '-', action: 'minus' },
              { label: '*', action: 'multiply' },
              { label: '/', action: 'divide' },
              { label: 'C', action: 'clear' },
              { label: '=', action: 'equal' },
            ].map(action => {
              return (
                <Pressable
                  style={{
                    width: screenSize.width / 6,
                    height: screenSize.width / 6,
                    borderRadius: (screenSize.width / 6) * 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'lightgray',
                  }}
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
