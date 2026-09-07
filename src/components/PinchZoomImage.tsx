import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  StyleProp,
  ImageStyle,
  ViewStyle,
} from 'react-native';

interface PinchZoomImageProps {
  uri: string;
  minScale?: number;
  maxScale?: number;
  controlledScale?: number;
  onScaleChange?: (scale: number) => void;
  onPress?: () => void;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  resizeMode?: 'contain' | 'cover' | 'stretch';
}

export const PinchZoomImage: React.FC<PinchZoomImageProps> = ({
  uri,
  minScale = 1.0,
  maxScale = 5.0,
  controlledScale,
  onScaleChange,
  onPress,
  style,
  containerStyle,
  resizeMode = 'contain',
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // Track raw values for calculations
  const scaleValueRef = useRef(1);
  const translateXValueRef = useRef(0);
  const translateYValueRef = useRef(0);

  // Gesture tracking refs
  const initialDistanceRef = useRef(0);
  const initialScaleRef = useRef(1);
  const initialTranslateXRef = useRef(0);
  const initialTranslateYRef = useRef(0);
  const lastTouchTimeRef = useRef(0);
  const isPinchingRef = useRef(false);
  const lastSingleTouchRef = useRef<{ x: number; y: number } | null>(null);

  // Update refs when animated values change
  useEffect(() => {
    const scaleSub = scale.addListener(({ value }) => {
      scaleValueRef.current = value;
    });
    const xSub = translateX.addListener(({ value }) => {
      translateXValueRef.current = value;
    });
    const ySub = translateY.addListener(({ value }) => {
      translateYValueRef.current = value;
    });

    return () => {
      scale.removeListener(scaleSub);
      translateX.removeListener(xSub);
      translateY.removeListener(ySub);
    };
  }, [scale, translateX, translateY]);

  // Sync external controlled scale if provided
  useEffect(() => {
    if (controlledScale !== undefined && Math.abs(controlledScale - scaleValueRef.current) > 0.05) {
      Animated.spring(scale, {
        toValue: controlledScale,
        useNativeDriver: true,
        friction: 7,
        tension: 40,
      }).start();

      if (controlledScale <= 1.05) {
        Animated.parallel([
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
        ]).start();
      }
    }
  }, [controlledScale]);

  // Calculate Euclidean distance between 2 touch points
  const getDistance = (touch1: any, touch2: any) => {
    if (!touch1 || !touch2) return 0;
    const dx = touch1.pageX - touch2.pageX;
    const dy = touch1.pageY - touch2.pageY;
    return Math.hypot(dx, dy);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;
        // Always capture if two fingers are on screen
        if (touches && touches.length >= 2) {
          return true;
        }
        // If zoomed in, allow dragging
        if (scaleValueRef.current > 1.05) {
          return Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2;
        }
        return false;
      },
      onMoveShouldSetPanResponderCapture: (evt) => {
        const touches = evt.nativeEvent.touches;
        return !!(touches && touches.length >= 2);
      },
      onPanResponderGrant: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;

        if (touches && touches.length >= 2) {
          isPinchingRef.current = true;
          initialDistanceRef.current = getDistance(touches[0], touches[1]);
          initialScaleRef.current = scaleValueRef.current;
        } else if (touches && touches.length === 1) {
          isPinchingRef.current = false;
          initialDistanceRef.current = 0;
          initialTranslateXRef.current = translateXValueRef.current;
          initialTranslateYRef.current = translateYValueRef.current;
          lastSingleTouchRef.current = { x: touches[0].pageX, y: touches[0].pageY };

          // Double tap detection
          const now = Date.now();
          if (now - lastTouchTimeRef.current < 300) {
            const targetScale = scaleValueRef.current > 1.2 ? 1.0 : 2.5;
            Animated.parallel([
              Animated.spring(scale, {
                toValue: targetScale,
                useNativeDriver: true,
                friction: 7,
                tension: 40,
              }),
              Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
              Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
            ]).start();
            if (onScaleChange) onScaleChange(targetScale);
            lastTouchTimeRef.current = 0;
            return;
          }
          lastTouchTimeRef.current = now;
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const touches = evt.nativeEvent.touches;

        if (touches && touches.length >= 2) {
          // 🖐️ TWO-FINGER PINCH TO ZOOM
          const currentDistance = getDistance(touches[0], touches[1]);

          // Initialize pinch distance if fingers landed separately
          if (!isPinchingRef.current || initialDistanceRef.current <= 0) {
            isPinchingRef.current = true;
            initialDistanceRef.current = currentDistance;
            initialScaleRef.current = scaleValueRef.current;
            initialTranslateXRef.current = translateXValueRef.current;
            initialTranslateYRef.current = translateYValueRef.current;
            return;
          }

          if (initialDistanceRef.current > 0 && currentDistance > 0) {
            const distanceRatio = currentDistance / initialDistanceRef.current;
            const newScale = Math.min(
              maxScale,
              Math.max(minScale * 0.8, initialScaleRef.current * distanceRatio)
            );
            scale.setValue(newScale);
            if (onScaleChange) onScaleChange(Number(newScale.toFixed(2)));
          }
        } else if (touches && touches.length === 1) {
          // If just switched from 2 fingers to 1 finger
          if (isPinchingRef.current) {
            isPinchingRef.current = false;
            initialDistanceRef.current = 0;
            initialTranslateXRef.current = translateXValueRef.current;
            initialTranslateYRef.current = translateYValueRef.current;
            lastSingleTouchRef.current = { x: touches[0].pageX, y: touches[0].pageY };
            return;
          }

          // 👆 ONE-FINGER PAN (When zoomed in)
          if (scaleValueRef.current > 1.05 && lastSingleTouchRef.current) {
            const dx = touches[0].pageX - lastSingleTouchRef.current.x;
            const dy = touches[0].pageY - lastSingleTouchRef.current.y;

            const maxPanX = (Dimensions.get('window').width * (scaleValueRef.current - 1)) / 2;
            const maxPanY = (Dimensions.get('window').height * 0.5 * (scaleValueRef.current - 1)) / 2;

            const nextX = Math.min(
              maxPanX + 50,
              Math.max(-maxPanX - 50, initialTranslateXRef.current + dx)
            );
            const nextY = Math.min(
              maxPanY + 50,
              Math.max(-maxPanY - 50, initialTranslateYRef.current + dy)
            );

            translateX.setValue(nextX);
            translateY.setValue(nextY);
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        isPinchingRef.current = false;
        initialDistanceRef.current = 0;
        lastSingleTouchRef.current = null;

        // If zoomed out below minScale, bounce back
        if (scaleValueRef.current < minScale) {
          Animated.parallel([
            Animated.spring(scale, { toValue: minScale, useNativeDriver: true }),
            Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
          ]).start();
          if (onScaleChange) onScaleChange(minScale);
        } else if (scaleValueRef.current <= 1.05) {
          // Reset pan offset if scale is back to 1x
          Animated.parallel([
            Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
          ]).start();
        }

        // Tap detection
        if (
          Math.abs(gestureState.dx) < 6 &&
          Math.abs(gestureState.dy) < 6 &&
          gestureState.numberActiveTouches === 0
        ) {
          if (onPress) {
            onPress();
          }
        }
      },
      onPanResponderTerminate: () => {
        isPinchingRef.current = false;
        initialDistanceRef.current = 0;
        lastSingleTouchRef.current = null;
      },
    })
  ).current;

  return (
    <View style={[styles.container, containerStyle]} {...panResponder.panHandlers}>
      <Animated.Image
        source={{ uri }}
        style={[
          styles.image,
          style,
          {
            transform: [
              { scale },
              { translateX },
              { translateY },
            ],
          },
        ]}
        resizeMode={resizeMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
