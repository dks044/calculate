import { NativeModules } from 'react-native';

export const excuteCalculator = (
  action: 'plus' | 'minus' | 'divide' | 'multiply' | 'equal',
  numberA: number,
  numberB: number,
): Promise<number> => {
  return NativeModules.CalculatorModule.executeCalc(action, numberA, numberB);
};
