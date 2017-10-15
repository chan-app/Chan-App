import React from "react";
import { Map } from "immutable";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import { Icon } from "react-native-material-ui";
import Image from "./Image";
import Description from "./Description";

const styles = {
  container: {
    padding: 15
  },
  buttonContainer: {
    alignItems: "flex-end"
  },
  childContainer: {
    marginTop: 15,
    marginLeft: -15,
    marginRight: -15,
    marginBottom: -15,
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  },
  child: {
    paddingBottom: 15
  },
  offset: {
    height: 15
  }
};

const PostChildren = ({ posts }) => (
  <View style={styles.childContainer}>
    {posts.map((item, key) => (
      <View key={key} style={styles.child}>
        {item.tim && <Image item={Map(item)} />}
        {item.com && <Description item={Map(item)} />}
      </View>
    ))}
  </View>
);

class IntroChildren extends React.unstable_AsyncComponent {
  state = { show: false };

  shouldComponentUpdate(_nextProps, nextState) {
    return nextState.show !== this.state.show;
  }

  toggle() {
    this.setState(({ show }) => ({ show: !show }));
  }

  buttons() {
    return (
      <TouchableWithoutFeedback onPress={::this.toggle}>
        <View style={styles.buttonContainer}>
          {this.state.show && <Icon name="arrow-upward" />}
          {!this.state.show && <Icon name="arrow-downward" />}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const Buttons = ::this.buttons;

    if (this.props.item.get("children").length < 1) {
      return <View style={styles.offset} />;
    }

    return (
      <View style={styles.container}>
        <Buttons />
        {this.state.show && (
          <PostChildren posts={this.props.item.get("children")} />
        )}
      </View>
    );
  }
}

export default IntroChildren;
