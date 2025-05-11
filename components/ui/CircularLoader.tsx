import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  useSharedValue,
  Easing
} from 'react-native-reanimated';

export const CircularLoader = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View style={[styles.loaderCircle, animatedStyle]}>
        <View style={styles.loaderInner} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#18181B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderCircle: {
    width: 30,
    height: 30,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderStyle: 'solid',
    borderTopColor: 'transparent',
  },
  loaderInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
}); 