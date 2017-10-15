import React from "react";
import { View, Animated, Easing } from "react-native";
import { Icon } from "react-native-material-ui";

const styles = {
  container: {
    flex: 1,
    marginTop: 32,
    justifyContent: "flex-start",
    alignItems: "center"
  }
};

const loader = ({
  msg,
  textStyle,
  emoji,
  containerStyle = {},
  animation = new Animated.Value(0)
}) => {
  Animated.loop(
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    })
  ).start();

  const style = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"]
        })
      }
    ]
  };

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <Animated.View style={style}>
        <Icon name="refresh" />
      </Animated.View>
    </View>
  );
};

export default loader;
