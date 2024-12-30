import { withSpring, withTiming } from 'react-native-reanimated';

export const slideInRight = {
  entering: (targetValues) => {
    'worklet';
    const animations = {
      transform: [
        {
          translateX: withSpring(0, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
    const initialValues = {
      transform: [
        {
          translateX: 400,
        },
      ],
    };
    return {
      initialValues,
      animations,
    };
  },
};

export const fadeIn = {
  entering: (targetValues) => {
    'worklet';
    const animations = {
      opacity: withTiming(1, { duration: 300 }),
    };
    const initialValues = {
      opacity: 0,
    };
    return {
      initialValues,
      animations,
    };
  },
};