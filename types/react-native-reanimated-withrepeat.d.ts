// Minimal augmentation to expose withRepeat for our TypeScript environment
declare module 'react-native-reanimated' {
  // `withRepeat` returns a generic `SharedValue` animation wrapper
  export function withRepeat(animation: any, times?: number, reverse?: boolean): any
}
