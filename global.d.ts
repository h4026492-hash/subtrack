declare module "@/*";
declare module "@expo/vector-icons/*";

declare module "react-native-reanimated" {
  const Animated: any;
  export default Animated;
  export function useAnimatedRef<T = any>(): any;
  export const useSharedValue: any;
  export const withTiming: any;
  export function interpolate(...args: any[]): any;
  export function useAnimatedStyle(...args: any[]): any;
  export function useScrollOffset(...args: any[]): any;

  export namespace Animated {
    export type ScrollView = any;
    export type View = any;
    export type Text = any;
  }
}

declare module "@playwright/test" {
  const anything: any;
  export = anything;
}
