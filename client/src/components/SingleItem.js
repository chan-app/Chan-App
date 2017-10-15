import React from "react";
import { View } from "react-native";
import { Card } from "react-native-material-ui";
import { withNavigation } from "react-navigation";
import Image from "./Image";
import Description from "./Description";
import IntroChildren from "./IntroChildren";

const onPress = (item, navigation) => () => {
  if (navigation.state.routeName === "Threads") {
    navigation.navigate("Posts", {
      board: navigation.state.params.board,
      no: item.get("no")
    });
  }
};

const SingleThread = ({
  item,
  navigation,
  style = {},
  onLink = () => {},
  handlePostOptions
}) => (
  <Card onPress={onPress(item, navigation)}>
    <View style={style}>
      {item.get("tim") && (
        <Image item={item} handlePostOptions={handlePostOptions} />
      )}
      {item.get("com") && (
        <Description
          item={item}
          onLink={onLink}
          handlePostOptions={handlePostOptions}
        />
      )}
      {item.get("children") && <IntroChildren item={item} />}
    </View>
  </Card>
);

export default withNavigation(SingleThread);
