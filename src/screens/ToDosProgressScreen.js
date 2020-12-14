import React, {useEffect, useRef} from 'react';
import { Text, StatusBar, View, StyleSheet, Animated, TextInput } from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

const data = {
    completedToDos: 15,
    radius: 100,
    strokeWidth: 10,
    duration: 900,
    delay: 500,
    color: "tomato",
    totalToDos: 20,
  };

const ToDosProgressScreen = ({ navigation }) => {
  //Inicializacion de variables a utilizar para la animacion del circulo
    const duration = 1000, delay = 500;
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const AnimatedInput = Animated.createAnimatedComponent(TextInput);
    const halfCircle = data.radius + data.strokeWidth;
    const circleCircumference = 2 * Math.PI * data.radius;
    const circleRef = useRef();
    const inputRef = useRef();
    const animatedValue = useRef(new Animated.Value(0)).current;
    
    const animation = (toValue) => {
        return Animated.timing(animatedValue, {
            toValue,
            duration,
            delay,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animation(data.completedToDos);
        animatedValue.addListener(v => {
            if (circleRef?.current) {
                const maxPercentage = (100 * v.value) / data.totalToDos;
                const strokeDashoffset = circleCircumference - (circleCircumference * maxPercentage) / 100;
                circleRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
            if (inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: `${Math.round(v.value)}`,
                });
            }
        })
        return () => {
            animatedValue.removeAllListeners();
        }
    }, [data.totalToDos, data.completedToDos])


  return (
    <View style={styles.container}>
      <StatusBar hidden />
          <Svg width={data.radius * 2} height={data.radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
              <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                  <Circle
                    cx='50%'
                    cy='50%'
                    stroke={data.color}
                    strokeWidth={data.strokeWidth}
                    r={data.radius}
                    fill="transparent"
                    strokeOpacity={0.2}
                  />
                  <AnimatedCircle
                    ref={circleRef}
                    cx="50%"
                    cy="50%"
                    stroke={data.color}
                    strokeWidth={data.strokeWidth}
                    r={data.radius}
                    fill="transparent"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={circleCircumference}
                    strokeLinecap="round"
                  />
              </G>
          </Svg>
           <AnimatedInput
                ref={inputRef}
                underlineColorAndroid="transparent"
                editable={false}
                defaultValue='0'
                style={styles.circleText}
           />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
  },
  svg: {
      width: data.radius * 2,
      height: data.radius * 2,
  },
  circleText: {
    ...StyleSheet.AbsoluteFillObject,
      fontSize: 80,
      color: "black",
      fontWeight: "900",
      textAlign: "center"
  }
});

export default ToDosProgressScreen;